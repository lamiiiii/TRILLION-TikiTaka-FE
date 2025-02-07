import {useState} from 'react';
import {TicketViewType} from '../../../interfaces/ticket';
import ManagerTicketList from '../common/ManagerTicketList';
import DashTicketFilter from '../common/DashTicketFilter';

export default function ManagerHomeContainer() {
  const [selectedFilter, setSelectedFilter] = useState<TicketViewType>('전체');
  const [ticketCounts, setTicketCounts] = useState<TicketStatusCount | null>(null);

  return (
    <div className="flex flex-col max-w-1200">
      {/* 필터 선택 시 상태 업데이트 */}
      <DashTicketFilter
        onFilterChange={(type) => setSelectedFilter(type as TicketViewType)}
        onCountUpdate={(counts) => setTicketCounts(counts)}
      />

      {/* 선택된 필터에 맞는 티켓만 표시 */}
      <ManagerTicketList selectedFilter={selectedFilter} ticketCounts={ticketCounts} />
    </div>
  );
}
