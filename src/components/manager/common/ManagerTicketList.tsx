import {useEffect, useState} from 'react';
import {getTicketList} from '../../../api/service/tickets';
import {useUserStore} from '../../../store/store'; // ✅ role 가져오기
import Dropdown from '../../common/Dropdown';
import PageNations from '../../manager/common/PageNations';
import DashTicket from './DashTicket';

const dropdownData = [
  {label: '담당자', options: ['곽서연', '김규리', '김낙도']},
  {label: '1차 카테고리', options: ['카테고리1', '카테고리2', '카테고리3']},
  {label: '2차 카테고리', options: ['서브1', '서브2', '서브3']},
  {label: '요청', options: ['요청1', '요청2', '요청3', '요청4', '요청5', '요청6']},
];

const mapFilterToStatus = (filter: string): string | undefined => {
  switch (filter) {
    case "대기중":
      return "PENDING";
    case "진행중":
      return "IN_PROGRESS";
    case "검토 요청":
      return "REVIEW";
    case "완료":
      return "DONE";
    default:
      return undefined; // 전체는 status 필터 없이 모든 티켓 조회
  }
};

const pageSizeOptions = ['20개씩', '30개씩', '50개씩'];
const orderByOptions = ['최신순', '생성순'];

// ✅ TicketListProps
interface TicketListProps {
  selectedFilter: string; // 필터 상태
  ticketCounts: TicketStatusCount | null;
}

export default function ManagerTicketList({selectedFilter, ticketCounts }: TicketListProps) {
  const role = useUserStore((state) => state.role).toLowerCase(); // ✅ 전역 상태에서 role 가져오기
  const [ticketList, setTicketList] = useState<TicketListItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string}>({});
  const [pageSize, setPageSize] = useState(20);
  const [orderBy, setOrderBy] = useState('최신순');
  // const [totalTickets, setTotalTickets] = useState(0);

  // ✅ API 요청: 티켓 목록 불러오기
  useEffect(() => {
    async function fetchTickets() {
      try {
        const statusParam = mapFilterToStatus(selectedFilter);
        const orderParam = orderBy === "최신순" ? "desc" : "asc";
        console.log(`🔹 API 요청: orderBy=${orderParam}, sortBy=createdAt`);
        const data = await getTicketList({
          page: currentPage - 1,
          size: pageSize,
          status: statusParam,
          orderBy: orderParam,
          
        });

        let filteredTickets  = [...data.content];

        if (selectedFilter === '긴급') {
          filteredTickets = filteredTickets.filter((ticket) => ticket.urgent === true);
        }

        // 🔹 프론트엔드에서 ticketId 기준 정렬
        if (orderBy === '최신순') {
          filteredTickets .sort((a, b) => b.ticketId - a.ticketId); // ticketId 내림차순 (최신순)
        } else {
          filteredTickets .sort((a, b) => a.ticketId - b.ticketId); // ticketId 오름차순 (생성순)
        }
        
        setTicketList(filteredTickets);
        // setTotalTickets(data.totalElements);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('티켓 목록 조회 실패:', error);
      }
    }

    fetchTickets();
  }, [selectedFilter, currentPage, pageSize, orderBy]);

  const selectedCount = ticketCounts
    ? selectedFilter === "전체"
      ? ticketCounts.total
      : selectedFilter === "대기중"
      ? ticketCounts.pending
      : selectedFilter === "진행중"
      ? ticketCounts.inProgress
      : selectedFilter === "검토 요청"
      ? ticketCounts.reviewing
      : selectedFilter === "완료"
      ? ticketCounts.completed
      : selectedFilter === "긴급"
      ? ticketCounts.urgent
      : 0
    : 0;

  // ✅ 페이지네이션 변경 핸들러
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // ✅ 드롭다운 선택 핸들러
  const handleSelect = (label: string, value: string) => {
    setSelectedFilters((prev) => ({...prev, [label]: value}));
  };

  const getDetailLink = (ticketId: number): string => {
    if (role === 'manager') return `/manager/detail/${ticketId}`;
    if (role === 'user') return `/user/detail/${ticketId}`;
    return `/detail/${ticketId}`;
  };

  const handleAssigneeChange = (ticketId: number, newAssignee: string) => {
    console.log(`티켓 ${ticketId}의 담당자가 ${newAssignee}(으)로 변경되었습니다.`);
  };

  return (
    <div className="w-full mt- relative mb-[100px]">
      <div className='flex mb-2 justify-end gap-3'>
        <Dropdown
          label="20개씩"
          options={pageSizeOptions}
          value={`${pageSize}개씩`}
          onSelect={(value) => setPageSize(parseInt(value))}
          paddingX="px-3"
          border={false}
          textColor=''
        />
        <Dropdown
              label="최신순"
              options={orderByOptions}
              value={orderBy}
              onSelect={(value) => setOrderBy(value)}
              paddingX="px-3"
              border={false}
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
