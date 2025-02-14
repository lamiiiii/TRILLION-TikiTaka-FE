import {useEffect, useState} from 'react';
import {TicketViewType} from '../../../interfaces/ticket';
import ManagerTicketList from '../common/ManagerTicketList';
import DashTicketFilter from '../common/DashTicketFilter';

export default function ManagerHomeContainer() {
  const [selectedFilter, setSelectedFilter] = useState<TicketViewType>('전체');
  const [ticketCounts, setTicketCounts] = useState<TicketStatusCount | null>(null);
  useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }, []);
  return (
    <div className="flex flex-col max-w-[1200px]">
      <DashTicketFilter
        onFilterChange={(type) => setSelectedFilter(type as TicketViewType)}
        onCountUpdate={(counts) => setTicketCounts(counts)}
      />
      <ManagerTicketList selectedFilter={selectedFilter} ticketCounts={ticketCounts} />
    </div>
  );
}
