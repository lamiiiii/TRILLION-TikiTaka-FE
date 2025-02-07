import {useEffect, useState} from 'react';
import {approveTicket, getTicketList, rejectTicket, updateTicketStatus, getTicketTypes} from '../../../api/service/tickets';
import {useUserStore} from '../../../store/store'; // role 가져오기
import Dropdown from '../../common/Dropdown';
import PageNations from '../../manager/common/PageNations';
import DashTicket from './DashTicket';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import {getManagerList} from '../../../api/service/users';
import {getCategoryList} from '../../../api/service/categories';


const mapFilterToStatus = (filter: string): string | undefined => {
  switch (filter) {
    case '대기중':
      return 'PENDING';
    case '진행중':
      return 'IN_PROGRESS';
    case '검토 요청':
      return 'REVIEW';
    case '완료':
      return 'DONE';
    default:
      return undefined; // 전체는 status 필터 없이 모든 티켓 조회
  }
};

const pageSizeOptions = ['20개씩', '30개씩', '50개씩'];
// const orderByOptions = ['최신순', '마감기한순', '오래된순'];

// TicketListProps
interface TicketListProps {
  selectedFilter: string; // 필터 상태
  ticketCounts: TicketStatusCount | null;
}

export default function ManagerTicketList({selectedFilter, ticketCounts}: TicketListProps) {
  const role = useUserStore((state) => state.role).toLowerCase(); // 전역 상태에서 role 가져오기
  const [ticketList, setTicketList] = useState<TicketListItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string}>({});
  const [pageSize, setPageSize] = useState(20);
  const [orderBy, setOrderBy] = useState('최신순');
  const queryClient = useQueryClient();
  // const [totalTickets, setTotalTickets] = useState(0);

  // 티켓 목록 가져오기 (React Query)
  const {data} = useQuery({
    queryKey: ['tickets', selectedFilter ?? '', currentPage ?? 1, pageSize ?? 20, orderBy ?? '최신순'],
    queryFn: async () => {
      const statusParam = mapFilterToStatus(selectedFilter ?? '전체');

      const ticketData = await getTicketList({
        page: (currentPage ?? 1) - 1,
        size: pageSize ?? 20,
        status: statusParam,
      });

      let sortedTickets = [...ticketData.content];

      // 긴급 티켓(urgent) 항상 상단에 위치하도록 정렬
      sortedTickets.sort((a, b) => {
        if (a.urgent && !b.urgent) return -1;
        if (!a.urgent && b.urgent) return 1;

        // 정렬 기준 적용
        if (orderBy === '최신순') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (orderBy === '마감기한순') {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        } else if (orderBy === '오래된순') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return 0;
      });

      return {...ticketData, content: sortedTickets};
    },
  });

   // 유저 정보 (담당자 리스트)
   const {data: userData} = useQuery({
    queryKey: ['managers'],
    queryFn: getManagerList,
    select: (data) => data.users,
  });

  // 티켓 타입 데이터
  const {data: ticketData} = useQuery({
    queryKey: ['types'],
    queryFn: getTicketTypes,
  });

  // 카테고리 데이터
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

  // 드롭다운 데이터 설정
  const dropdownData = [
    {
      label: '담당자',
      options: userData?.map((user: any) => user.username), // 담당자 목록
    },
    {
      label: '1차 카테고리',
      options: categories.map((cat: any) => cat.primary.name), // 1차 카테고리
    },
    {
      label: '2차 카테고리',
      options: selectedFilters['1차 카테고리']
        ? (categories
            .find((cat: any) => cat.primary.name === selectedFilters['1차 카테고리'])
            ?.secondaries.map((secondary: any) => secondary.name) ?? []) // 2차 카테고리, null 처리
        : [], // 1차 카테고리가 선택되지 않으면 빈 배열 반환
    },
    {
      label: '요청',
      options: ticketData?.map((type: any) => type.typeName), // 요청 타입
    },
  ];


  useEffect(() => {
    if (data?.content) {
      console.log('📌 티켓 리스트 업데이트:', data.content); // 데이터 확인용
      setTicketList(data.content);
    }

    if (data?.totalPages) {
      console.log('📌 총 페이지 수 업데이트:', data.totalPages);
      setTotalPages(data.totalPages);
    }
  }, [data?.content, data?.totalPages]);

  const selectedCount = ticketCounts
    ? selectedFilter === '전체'
      ? ticketCounts.total
      : selectedFilter === '대기중'
        ? ticketCounts.pending
        : selectedFilter === '진행중'
          ? ticketCounts.inProgress
          : selectedFilter === '검토 요청'
            ? ticketCounts.reviewing
            : selectedFilter === '완료'
              ? ticketCounts.completed
              : selectedFilter === '긴급'
                ? ticketCounts.urgent
                : 0
    : 0;

  // 페이지네이션 변경 핸들러
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // 드롭다운 선택 핸들러
  const handleSelect = (label: string, value: string) => {
    if (label === '1차 카테고리') {
      setSelectedFilters((prev) => ({
        ...prev,
        ['1차 카테고리']: value,
        ['2차 카테고리']: '', // 2차 카테고리 초기화
      }));
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        [label]: value,
      }));
    }
  };

  const getDetailLink = (ticketId: number): string => {
    if (role === 'manager') return `/manager/detail/${ticketId}`;
    if (role === 'user') return `/user/detail/${ticketId}`;
    return `/detail/${ticketId}`;
  };

  const handleAssigneeChange = (ticketId: number, newAssignee: string) => {
    console.log(`티켓 ${ticketId}의 담당자가 ${newAssignee}(으)로 변경되었습니다.`);
  };

  // 승인 요청 (React Query Mutation)
  const approveMutation = useMutation({
    mutationFn: (ticketId: number) => approveTicket(ticketId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['tickets']});
      toast.success(' 티켓이 승인되었습니다.');
    },
  });

  // 반려 요청 (React Query Mutation)
  const rejectMutation = useMutation({
    mutationFn: (ticketId: number) => rejectTicket(ticketId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['tickets']});
      alert(' 티켓이 반려되었습니다.');
    },
  });

  // 티켓 상태 변경 요청
  const updateStatusMutation = useMutation({
    mutationFn: ({ticketId, newStatus}: {ticketId: number; newStatus: string}) => updateTicketStatus(ticketId, newStatus),
    onSuccess: (_, {newStatus}) => {
      queryClient.invalidateQueries({queryKey: ['tickets']});
      queryClient.setQueryData(['ticketStatusCounts'], (prev: any) => ({
        ...prev,
        inProgress: newStatus === 'DONE' ? prev.inProgress - 1 : prev.inProgress,
        reviewing: newStatus === 'DONE' ? prev.reviewing - 1 : prev.reviewing,
        completed: newStatus === 'DONE' ? prev.completed + 1 : prev.completed,
      }));
       // 상태 변경 메시지 동적 설정
    const statusMessage: Record<string, string> = {
      PENDING: "티켓 상태가 대기중으로 변경되었습니다.",
      DONE: "티켓 상태가 완료로 변경되었습니다.",
    };

    toast.success(statusMessage[newStatus] || "티켓 상태가 변경되었습니다.");
    },
    onError: () => {
      toast.error('티켓 상태 변경 실패. 다시 시도하세요.');
    },
  });

  const handleStatusChange = (ticketId: number, newStatus: string) => {
    updateStatusMutation.mutate({ticketId, newStatus});
  };

  return (
    <div className="w-full mt- relative mb-[100px]">
      <div className="flex mb-2 justify-end gap-3">
        <Dropdown
          label="20개씩"
          options={pageSizeOptions}
          value={`${pageSize}개씩`}
          onSelect={(value) => setPageSize(parseInt(value))}
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
      <div className="bg-gray-18 h-full shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] flex flex-col justify-start p-4">
        {/* 드롭다운 필터 */}
        <div className="flex justify-between items-center  mt-4 px-2">
          <div className="flex items-center gap-4 leading-none">
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
          </div>

          <div className="ml-auto text-gray-700 text-subtitle">
            조회 건수 <span className="text-black text-title-bold ml-1">{selectedCount}건</span>
          </div>
        </div>

        {/* 테이블 헤더 */}
        <div className="flex gap-4 py-2 text-gray-700 text-title-regular mt-5 mb-5 px-2">
          <div className="w-[6%]">티켓 ID</div>
          <div className="w-[12%]">카테고리</div>
          <div className={role === 'user' ? 'w-[51%]' : 'w-[36%]'}>요청 내용</div>
          <div className="w-[12%]">기한</div>
          <div className="w-[10%]">담당자</div>
          {role !== 'user' && <div className="w-[15%]">승인 여부</div>}
        </div>

        {/* 티켓 리스트 */}
        <div className="flex flex-col gap-4">
          {ticketList.length > 0 ? (
            ticketList.map((ticket) => (
              <DashTicket
                key={ticket.ticketId}
                {...ticket}
                detailLink={getDetailLink(ticket.ticketId)}
                onAssigneeChange={(newAssignee) => handleAssigneeChange(ticket.ticketId, newAssignee)}
                onApprove={() => approveMutation.mutate(ticket.ticketId)}
                onReject={() => rejectMutation.mutate(ticket.ticketId)}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="text-gray-500 text-center py-4">해당 상태의 티켓이 없습니다.</div>
          )}
        </div>

        {/* 페이지네이션 */}
        <PageNations currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
