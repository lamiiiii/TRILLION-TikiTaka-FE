import {useEffect, useState} from 'react';
import {ticketDummy} from '../../../data/ticketData';
import Dropdown from '../Dropdown';
import Ticket from './Ticket';
import PageNations from '../../manager/common/PageNations';

const dropdownData: {label: string; options: string[]}[] = [
  {label: '담당자', options: ['곽서연', '김규리', '김낙도']},
  {label: '1차 카테고리', options: ['카테고리1', '카테고리2', '카테고리3']},
  {label: '2차 카테고리', options: ['서브1', '서브2', '서브3']},
  {label: '요청', options: ['요청1', '요청2', '요청3', '요청4', '요청5', '요청6']},
];

interface TicketListProps {
  role: 'manager' | 'user' | 'admin';
}

export default function TicketList({role}: TicketListProps) {
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string}>({});
  const [filteredTickets, setFilteredTickets] = useState([...ticketDummy]); // ✅ useState로 filteredTickets 관리

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  // ✅ 필터 & 정렬 적용
  useEffect(() => {
    let updatedTickets = [...ticketDummy];

    // 🔹 긴급 티켓이 가장 위로, 기한이 오래된 순으로 정렬
    updatedTickets.sort((a, b) => {
      if (a.isUrgent !== b.isUrgent) {
        return b.isUrgent ? 1 : -1; // 긴급 티켓이 먼저 오도록
      }
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime(); // 기한이 빠른 순 정렬
    });

    setFilteredTickets(updatedTickets);
  }, [selectedFilters]);

  // ✅ 페이지네이션 적용: 현재 페이지에 해당하는 티켓만 표시
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  // ✅ 총 페이지 수 계산
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  // ✅ 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSelect = (label: string, value: string) => {
    setSelectedFilters((prev) => ({...prev, [label]: value}));
  };

  const handleAssigneeChange = (id: string, newAssignee: string) => {
    console.log(`티켓 ${id}의 담당자가 ${newAssignee}(으)로 변경되었습니다.`);
  };

  const handleApprove = (id: string) => {
    console.log(`티켓 ${id} 진행`);
  };

  const handleReject = (id: string) => {
    console.log(`티켓 ${id} 반려`);
  };

  return (
    <div className="w-full mt-[20px] px-4 relative mb-[100px]">
      <div className="bg-gray-18 h-full shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] flex flex-col justify-start p-4">
        {/* 드롭다운 필터 리스트 */}
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

        {/* 테이블 헤더 */}
        <div className="flex gap-4 py-2 text-gray-700 text-title-regular mt-5 mb-5 px-2">
          <div className="w-[6%]">티켓 ID</div>
          <div className="w-[12%]">카테고리</div>
          <div className={role === 'user' ? 'w-[51%]' : 'w-[36%]'}>요청 내용</div>
          <div className="w-[12%]">기한</div>
          <div className="w-[10%]">담당자</div>
          {role !== 'user' && <div className="w-[15%]">승인 여부</div>}
        </div>

        {/* ✅ 현재 페이지에 맞는 티켓만 표시 */}
        <div className="flex flex-col gap-4">
          {currentTickets.length > 0 ? (
            currentTickets.map((ticket) => (
              <Ticket
                role={role}
                key={ticket.id}
                {...ticket}
                onAssigneeChange={(newAssignee) => handleAssigneeChange(ticket.id, newAssignee)}
                onApprove={() => handleApprove(ticket.id)}
                onReject={() => handleReject(ticket.id)}
              />
            ))
          ) : (
            <div className="text-gray-500 text-center py-4">해당 상태의 티켓이 없습니다.</div>
          )}
        </div>

        {/* ✅ 페이지네이션 컴포넌트 추가 */}
        <PageNations currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
