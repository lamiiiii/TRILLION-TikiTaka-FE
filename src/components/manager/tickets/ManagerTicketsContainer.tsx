// 담당자 - 티켓 관리 대시보드 (전체)

import TopMenu from '../../common/TopMenu';
import TicketAnalytics from './TicketAnalytics';
import TicketFilter from './TicketFilter';
import TicketProfile from './TicketProfile';

export default function ManagerTicketsContainer() {
  return (
    <div className="flex flex-col max-w-1200">
      <TopMenu boldBlackText="Dashboard" boldGrayText="티켓 관리 대시보드" rightText="나의 티켓 관리 바로가기" linkTo="/manager/tickets" />
      <div className="mt-5 flex gap-6">
        <TicketProfile />
        <TicketAnalytics />
      </div>

      <TicketFilter />
    </div>
  );
}
