import {useState} from 'react';
import AccountFilter from './AccountFilter';
import AccountList from './AccountList';
import UserList from './UserList';
import AdminTopMenu from '../AdminTopMenu';

export default function AdminAccountContainer() {
  const [selectedTab, setSelectedTab] = useState<'승인 대기' | '계정 목록'>('승인 대기');

  return (
    <div className="flex flex-col max-w-[1200px]">
      <AccountFilter onFilterChange={setSelectedTab} />
      <div>{selectedTab === '승인 대기' ? <AccountList /> : <UserList />}</div>
    </div>
  );
}
