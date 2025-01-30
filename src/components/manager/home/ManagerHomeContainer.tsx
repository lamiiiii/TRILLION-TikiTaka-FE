// 담당자 - 티켓 관리 대시보드 (전체)


import TicketFilter from './TicketFilter';
import TicketList from './TicketList';

export default function ManagerHomeContainer() {
  return (
    <div className="flex flex-col max-w-1200">
      
      <TicketFilter/>
      <TicketList/>
    </div>
  );
}
