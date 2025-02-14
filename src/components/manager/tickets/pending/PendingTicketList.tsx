import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useEffect, useRef, useState} from 'react';
import {getCategoryList} from '../../../../api/service/categories';
import {approveTicket, getTicketList, getTicketTypes, rejectTicket} from '../../../../api/service/tickets';
import {getManagerList} from '../../../../api/service/users';
import {useUserStore} from '../../../../store/store';
import Dropdown from '../../../common/Dropdown';
import {RefreshIcon} from '../../../common/Icon';
import PageNations from '../../../common/PageNations';
import Ticket from '../../../common/ticket/Ticket';
import {pageSizeOptions} from '../../../../constants/constants';

interface TicketListProps {
  selectedFilter: '전체' | '나의 요청';
}

const typeMapping: Record<string, string> = {CREATE: '생성', DELETE: '삭제', ETC: '기타', UPDATE: '수정'};

export default function PendingTicketList({selectedFilter}: TicketListProps) {
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string}>({});
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = useState(20);
  const [orderBy, setOrderBy] = useState('최신순');
  const queryClient = useQueryClient();

  const {userId} = useUserStore();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);

  const {data: ticketListData} = useQuery({
    queryKey: ['ticketList', currentPage, selectedFilter, selectedFilters, userId, orderBy ?? '최신순',],
    queryFn: () => {
      const selectedManagerId = userData?.find((user: any) => user.username === selectedFilters['담당자'])?.userId;
      const firstCategoryId = categories?.find((cat: any) => cat.primary.name === selectedFilters['1차 카테고리'])?.primary.id;
      const secondCategoryId = categories
        ?.find((cat: any) => cat.primary.name === selectedFilters['1차 카테고리'])
        ?.secondaries.find((sub: any) => sub.name === selectedFilters['2차 카테고리'])?.id;
      const ticketTypeId = typeData?.find((type: any) => type.typeName === selectedFilters['요청'])?.typeId;
      const sortParam =
        orderBy === '최신순' ? 'newest' : orderBy === '마감기한순' ? 'deadline' : orderBy === '오래된순' ? 'oldest' : 'newest';

      return getTicketList({
        page: (currentPage ?? 1) - 1,
        size: pageSize ?? 20,
        status: 'PENDING',
        managerId: selectedFilter === '나의 요청' ? userId : selectedManagerId,
        firstCategoryId,
        secondCategoryId,
        ticketTypeId,
        sort: sortParam,
      });
    },
  });

  const {data: userData} = useQuery({queryKey: ['managers'], queryFn: getManagerList, select: (data) => data.users});

  const {data: typeData} = useQuery({queryKey: ['types'], queryFn: getTicketTypes});

  const {data: categories = []} = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const primaryCategories = await getCategoryList();
      const secondaryRequests = primaryCategories.map(async (primary) => {
        const secondaries = await getCategoryList(primary.id);
        return {primary, secondaries};
      });

      return Promise.all(secondaryRequests);
    },
  });

  const dropdownData = [
    {label: '담당자', options: userData?.map((user: any) => user.username)},
    {label: '1차 카테고리', options: categories.map((cat: any) => cat.primary.name)},
    {
      label: '2차 카테고리',
      options: selectedFilters['1차 카테고리']
        ? (categories
            .find((cat: any) => cat.primary.name === selectedFilters['1차 카테고리'])
            ?.secondaries.map((secondary: any) => secondary.name) ?? [])
        : [],
    },
    {label: '요청', options: typeData?.map((type: any) => typeMapping[type.typeName] || type.typeName)},
  ];

  useEffect(() => {
    if (ticketListData?.totalPages && currentPage < ticketListData.totalPages) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['ticketList', nextPage, selectedFilter, selectedFilters],
        queryFn: () => getTicketList({page: nextPage}),
      });
    }
  }, [currentPage, queryClient, ticketListData?.totalPages, selectedFilter, selectedFilters]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView();
    }
  }, [currentPage]);

  const approveMutation = useMutation({
    mutationFn: (ticketId: number) => approveTicket(ticketId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ticketList']});
    },
    onError: () => {
      alert('티켓 승인에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (ticketId: number) => rejectTicket(ticketId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ticketList']});
    },
    onError: () => {
      alert('티켓 반려에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const handlePageChange = (newPage: number) => {
    if (ticketListData?.totalPages && newPage >= 1 && newPage <= ticketListData?.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSelect = (label: string, value: string) => {
    if (label === '1차 카테고리') {
      setSelectedFilters((prev) => ({...prev, ['1차 카테고리']: value, ['2차 카테고리']: ''}));
    } else {
      setSelectedFilters((prev) => ({...prev, [label]: value}));
    }
  };

  const handleAssigneeChange = (ticketId: number, newAssignee: string) => {
    console.log(`티켓 ${ticketId}의 담당자가 ${newAssignee}(으)로 변경되었습니다.`);
  };

  const handleApprove = (ticketId: number) => {
    approveMutation.mutate(ticketId);
  };

  const handleReject = (ticketId: number) => {
    rejectMutation.mutate(ticketId);
  };

  return (
    <div ref={listRef} className="w-full relative mb-[100px]">
      <div className="flex mb-2 justify-end gap-3 ">
        <Dropdown
          label="20개씩"
          options={pageSizeOptions}
          value={`${pageSize}개씩`}
          onSelect={(value) => setPageSize(parseInt(value.replace('개씩', ''), 10))}
          paddingX="px-3"
          border={false}
          textColor=""
        />
        <Dropdown
          label="정렬 기준"
          options={['최신순', '마감기한순', '오래된순']}
          value={orderBy || '정렬 기준'}
          onSelect={(value) => setOrderBy(value)}
          paddingX="px-4"
          border={false}
          textColor=""
        />
      </div>
      <div className="bg-gray-18 h-full flex flex-col justify-start p-4">
        <div className="flex items-center gap-4 leading-none mt-4 px-2">
          {dropdownData.map((data) => (
            <Dropdown
              key={data.label}
              label={data.label}
              options={data.options}
              value={
                data.label === '요청'
                  ? typeMapping[selectedFilters[data.label]] || selectedFilters[data.label]
                  : selectedFilters[data.label]
              }
              onSelect={(value) => handleSelect(data.label, value)}
              paddingX="px-3"
              disabled={data.label === '2차 카테고리' && !selectedFilters['1차 카테고리']}
            />
          ))}
          <button
            className=" text-gray-800 rounded-md  transition"
            onClick={() => {
              setSelectedFilters({});
              setCurrentPage(1);
            }}
          >
            <RefreshIcon />
          </button>
          <div className="ml-auto text-gray-700 text-subtitle">
            조회 건수 <span className="text-black text-title-bold ml-1">{ticketListData?.totalElements}건</span>
          </div>
        </div>
        <div className="flex gap-4 py-2 text-gray-700 text-title-regular mt-5 mb-5 px-2">
          <div className="w-[6%]">티켓 ID</div>
          <div className="w-[14%]">카테고리</div>
          <div className="w-[30%]">요청 내용</div>
          <div className="w-[12%]">기한</div>
          <div className="w-[14%]">담당자</div>
          <div className="w-[15%]">승인 여부</div>
        </div>
        <div className="flex flex-col gap-4">
          {ticketListData?.content &&
            ticketListData?.content?.length > 0 &&
            ticketListData?.content?.map((ticket: any) => (
              <Ticket
                key={ticket.ticketId}
                {...ticket}
                onAssigneeChange={(newAssignee) => handleAssigneeChange(ticket.ticketId, newAssignee)}
                onApprove={() => handleApprove(ticket.ticketId)}
                onReject={() => handleReject(ticket.ticketId)}
              />
            ))}
        </div>
        <PageNations currentPage={currentPage} totalPages={ticketListData?.totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
