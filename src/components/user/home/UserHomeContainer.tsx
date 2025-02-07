import {useState} from 'react';
import TopMenu from '../../common/TopMenu';
import TicketFilter from '../../common/ticket/TicketFilter';
import TicketList from '../../common/ticket/TicketList';
import UserCategoryAnalytics from './UserCategoryAnalytics';
import UserCompleteAnalytics from './UserCompleteAnalytics';
import {TicketViewType} from '../../../interfaces/ticket';

export default function UserHomeContainer() {
  const [selectedFilter, setSelectedFilter] = useState<TicketViewType>('전체');
  return (
    <div className="flex flex-col max-w-1200">
      <TopMenu boldBlackText="Dashboard" boldGrayText="티켓 관리 대시보드" rightText="티켓 생성 바로가기" linkTo="/user/newticket" />
      <div className="mt-5 flex gap-6">
        <UserCompleteAnalytics />
        <UserCategoryAnalytics />
      </div>
      <TicketFilter role="user" onFilterChange={setSelectedFilter} />
      <TicketList role="user" selectedFilter={selectedFilter} />
    </div>
  );
}
