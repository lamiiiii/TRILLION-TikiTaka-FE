// 담당자 - 티켓 관리 대시보드 (전체)

import TopMenu from '../../common/TopMenu';
import TicketAnalytics from './TicketAnalytics';
import TicketAwaitingList from './TicketAwaitingList';
import TicketPersonalManageList from './TicketPersonalManageList';
export default function ManagerTicketsContainer() {
  return (
    <div className="flex flex-col max-w-1200">
      <TopMenu boldBlackText="Dashboard" boldGrayText="나의 티켓 관리" />
      <div className="mt-5 flex gap-6">
        <TicketAnalytics />
      </div>

      <TicketAwaitingList />
      <TicketPersonalManageList />
    </div>
  );
}
