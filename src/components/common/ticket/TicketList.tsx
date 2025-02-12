import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getCategoryList } from '../../../api/service/categories';
import { getTicketTypes } from '../../../api/service/tickets';
import { getManagerList } from '../../../api/service/users';
import { ticketDummy } from '../../../data/ticketData';
import { TicketDataProps, TicketStatusType, TicketViewType } from '../../../interfaces/ticket';
import Dropdown from '../Dropdown';
import PageNations from '../PageNations';
import Ticket from './Ticket';

interface TicketListProps {
  role: 'manager' | 'user' | 'admin';
  selectedFilter: TicketViewType; // 필터 상태 추가
}

// TicketViewType을 실제 API status 값으로 변환하는 함수
const mapViewTypeToStatus = (viewType: TicketViewType): TicketStatusType | null => {
  switch (viewType) {
    case '대기중':
      return 'PENDING';
    case '진행중':
    case '검토 요청':
      return 'IN_PROGRESS';
    case '완료':
      return 'COMPLETED';
    default:
      return null; // 전체/긴급은 따로 처리
  }
};

export default function TicketList({role, selectedFilter}: TicketListProps) {
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string}>({});
  const [filteredTickets, setFilteredTickets] = useState<TicketDataProps[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  useEffect(() => {
    let updatedTickets = [...ticketDummy];

    const mappedStatus = mapViewTypeToStatus(selectedFilter);

    // 필터 적용
    if (selectedFilter !== '전체') {
      updatedTickets = updatedTickets.filter((ticket) => {
        if (selectedFilter === '긴급') return ticket.urgent;
        return mappedStatus ? ticket.status === mappedStatus : true;
      });
    }

    // 🔹 긴급 티켓이 가장 위로, 기한이 오래된 순으로 정렬
    updatedTickets.sort((a, b) => {
      if (a.urgent !== b.urgent) return b.urgent ? 1 : -1;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });

    setFilteredTickets(updatedTickets);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 초기화
  }, [selectedFilter, selectedFilters]);

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / ticketsPerPage)); // totalPages 최소 1 유지

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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
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
    console.log(`티켓 ${ticketId} 진행`);
  };

  const handleReject = (ticketId: number) => {
    console.log(`티켓 ${ticketId} 반려`);
  };

  return (
    <div className="w-full mt-[20px] relative mb-[100px]">
      <div className="bg-gray-18 h-full flex flex-col justify-start p-4">
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
            조회 건수 <span className="text-black text-title-bold ml-1">{filteredTickets.length}건</span>
          </div>
        </div>

        <div className="flex gap-4 py-2 text-gray-700 text-title-regular mt-5 mb-5 px-2">
          <div className="w-[6%]">티켓 ID</div>
          <div className="w-[12%]">카테고리</div>
          <div className={role === 'user' ? 'w-[51%]' : 'w-[36%]'}>요청 내용</div>
          <div className="w-[12%]">기한</div>
          <div className="w-[10%]">담당자</div>
          {role !== 'user' && <div className="w-[15%]">승인 여부</div>}
        </div>

        <div className="flex flex-col gap-4">
          {currentTickets.length > 0 ? (
            currentTickets.map((ticket) => (
              <Ticket
                key={ticket.ticketId}
                {...ticket}
                role={role}
                onAssigneeChange={(newAssignee) => handleAssigneeChange(ticket.ticketId, newAssignee)}
                onApprove={() => handleApprove(ticket.ticketId)}
                onReject={() => handleReject(ticket.ticketId)}
              />
            ))
          ) : (
            <div className="text-gray-500 text-center py-4">해당 상태의 티켓이 없습니다.</div>
          )}
        </div>

        <PageNations currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
