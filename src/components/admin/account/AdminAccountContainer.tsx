import {useState} from 'react';
import AccountFilter from './AccountFilter';
import AccountList from './AccountList';
import UserList from './UserList';
import AdminTopMenu from '../AdminTopMenu';

export default function AdminAccountContainer() {
  const [selectedTab, setSelectedTab] = useState<'승인 대기' | '계정 목록'>('승인 대기');

  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200">
        <AdminTopMenu boldBlackText="계정 관리" boldSmText="부서 · 소속 · 역할 변경 / 계정 승인 " />
        <AccountFilter onFilterChange={setSelectedTab} />
        <div>{selectedTab === '승인 대기' ? <AccountList /> : <UserList />}</div>
      </div>
    </div>
  );
}
