// 담당자 - 티켓 관리 대시보드 (전체)

import {useState} from 'react';
import TicketProfile from '../../common/ticket/TicketProfile';
import TopMenu from '../../common/TopMenu';
import TicketAnalytics from './TicketAnalytics';
import TicketAwaitingList from './TicketAwaitingList';
import TicketPersonalManageList from './TicketPersonalManageList';
import {UserInfo} from '../../../interfaces/interfaces';

export default function ManagerTicketsContainer() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'Yeon',
    email: 'yeonii@gmail.com',
    role: 'manager',
    website: 'https://www.kakaowork.com/',
  });

  const handleUserInfoChange = (newUserInfo: UserInfo) => {
    setUserInfo(newUserInfo);
  };
  return (
    <div className="flex flex-col max-w-1200">
      <TopMenu boldBlackText="Dashboard" boldGrayText="티켓 관리 대시보드" rightText="나의 티켓 관리 바로가기" linkTo="/manager/tickets" />
      <div className="mt-5 flex gap-6">
        <TicketProfile userInfo={userInfo} onUserInfoChange={handleUserInfoChange} />
        <TicketAnalytics />
      </div>

      <TicketAwaitingList />
      <TicketPersonalManageList />
    </div>
  );
}
