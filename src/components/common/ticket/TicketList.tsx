import {useEffect, useRef, useState} from 'react';
import Dropdown from '../Dropdown';
import Ticket from './Ticket';
import PageNations from '../../manager/common/PageNations';
import {TicketViewType} from '../../../interfaces/ticket';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {approveTicket, getTicketList, rejectTicket} from '../../../api/service/tickets';

const dropdownData: {label: string; options: string[]}[] = [
  {label: '담당자', options: ['곽서연', '김규리', '김낙도']},
  {label: '1차 카테고리', options: ['카테고리1', '카테고리2', '카테고리3']},
  {label: '2차 카테고리', options: ['서브1', '서브2', '서브3']},
  {label: '요청', options: ['요청1', '요청2', '요청3', '요청4', '요청5', '요청6']},
];

interface TicketListProps {
  role: 'manager' | 'user' | 'admin';
  selectedFilter: TicketViewType; // 필터 상태 추가
}

export default function TicketList({role, selectedFilter}: TicketListProps) {
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string}>({});
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);

  const ticketsPerPage = 20;

  const queryClient = useQueryClient();

  //티켓 리스트 조회
  const {data: ticketListData} = useQuery({
    queryKey: ['ticketList', currentPage, selectedFilter, selectedFilters],
    queryFn: () =>
      getTicketList({
        page: currentPage - 1,
        size: ticketsPerPage,
        status: 'PENDING', //승인 대기 티켓 조회
      }),
  });

  //다음 페이지 preFetch
  useEffect(() => {
    if (ticketListData?.totalPages && currentPage < ticketListData.totalPages) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['ticketList', nextPage, selectedFilter, selectedFilters],
        queryFn: () => getTicketList({page: nextPage}),
      });
    }
  }, [currentPage, queryClient, ticketListData?.totalPages, selectedFilter, selectedFilters]);

  // 페이지 변경 시 스크롤 위치 조정
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView();
    }
  }, [currentPage]);

  // 티켓 승인
  const approveMutation = useMutation({
    mutationFn: (ticketId: number) => approveTicket(ticketId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ticketList']});
    },
    onError: () => {
      alert('티켓 승인에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  // 티켓 반려
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
    setSelectedFilters((prev) => ({...prev, [label]: value}));
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
    <div ref={listRef} className="w-full mt-[20px] relative mb-[100px]">
      <div className="bg-gray-18 h-full shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] flex flex-col justify-start p-4">
        <div className="flex items-center gap-4 leading-none mt-4 px-2">
          {dropdownData.map((data) => (
            <Dropdown
              key={data.label}
              label={data.label}
              options={data.options}
              value={selectedFilters[data.label]}
              onSelect={(value) => handleSelect(data.label, value)}
              paddingX="px-3"
            />
          ))}
          <div className="ml-auto text-gray-700 text-subtitle">
            조회 건수 <span className="text-black text-title-bold ml-1">{ticketListData?.totalElements}건</span>
          </div>
        </div>

        <div className="flex gap-4 py-2 text-gray-700 text-title-regular mt-5 mb-5 px-2">
          <div className="w-[6%]">티켓 ID</div>
          <div className="w-[12%]">카테고리</div>
          <div className="w-[30%]">요청 내용</div>
          <div className="w-[12%]">기한</div>
          <div className="w-[16%]">담당자</div>
          {role !== 'user' && <div className="w-[15%]">승인 여부</div>}
        </div>

        <div className="flex flex-col gap-4">
          {ticketListData?.content &&
            ticketListData?.content?.length > 0 &&
            ticketListData?.content?.map((ticket: any) => (
              <Ticket
                key={ticket.ticketId}
                {...ticket}
                role={role}
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
