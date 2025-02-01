import {useState} from 'react';
import TicketProfile from '../../common/ticket/TicketProfile';
import TopMenu from '../../common/TopMenu';
import {UserInfo} from '../../../interfaces/interfaces';
import TicketFilter from '../../common/ticket/TicketFilter';
import TicketList from '../../common/ticket/TicketList';
import UserCategoryAnalytics from './UserCategoryAnalytics';
import UserCompleteAnalytics from './UserCompleteAnalytics';

export default function UserHomeContainer() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'Hong',
    email: 'Hong@gmail.com',
    role: 'user',
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
        <UserCompleteAnalytics />
        <UserCategoryAnalytics />
      </div>
      <TicketFilter role="user" />
      <TicketList role="user" />
    </div>
  );
}
