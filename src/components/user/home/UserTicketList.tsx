import {useEffect, useState} from 'react';
import PageNations from '../../manager/common/PageNations';
import {TicketViewType} from '../../../interfaces/ticket';
import DropDown from '../../common/Dropdown';
import Ticket from '../../common/ticket/Ticket';
import {useQuery} from '@tanstack/react-query';
import {getTicketList} from '../../../api/service/tickets';

const dropdownData: {label: string; options: string[]}[] = [
  {label: '담당자', options: ['곽서연', '김규리', '김낙도']},
  {label: '1차 카테고리', options: ['카테고리1', '카테고리2', '카테고리3']},
  {label: '2차 카테고리', options: ['서브1', '서브2', '서브3']},
  {label: '요청', options: ['요청1', '요청2', '요청3', '요청4', '요청5', '요청6']},
];

interface TicketListProps {
  selectedFilter: TicketViewType; // 필터 상태 추가
}

export default function UserTicketList({selectedFilter}: TicketListProps) {
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string}>({});
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  const {data: ticketListResponse} = useQuery({
    queryKey: ['ticketList', selectedFilter, selectedFilters, currentPage],
    queryFn: () =>
      getTicketList({
        page: currentPage - 1,
        size: ticketsPerPage,
        status: selectedFilter !== '전체' ? selectedFilter : undefined,
      }),
  });

  const filteredTickets = ticketListResponse?.content || [];
  const totalPages = ticketListResponse?.totalPages || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, selectedFilters]);

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

  return (
    <div className="w-full mt-[20px] relative mb-[100px]">
      <div className="bg-gray-18 h-full shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] flex flex-col justify-start p-4">
        <div className="flex items-center gap-4 leading-none mt-4 px-2">
          {dropdownData.map((data) => (
            <DropDown
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
          <div className="w-[14%]">카테고리</div>
          <div className="w-[30%]">요청 내용</div>
          <div className="w-[12%]">마감 기한</div>
          <div className="w-[14%]">담당자</div>
        </div>

        <div className="flex flex-col gap-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket: any) => (
              <Ticket
                key={ticket.ticketId}
                {...ticket}
                role={'user'}
                onAssigneeChange={(newAssignee) => handleAssigneeChange(ticket.ticketId, newAssignee)}
                onApprove={() => {}}
                onReject={() => {}}
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
