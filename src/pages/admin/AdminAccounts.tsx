import AdminAccountContainer from '../../components/admin/account/AdminAccountContainer';
import AdminTopMenu from './common/AdminTopMenu';

export default function AdminAccounts() {
  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200">
        <AdminTopMenu
          boldBlackText="계정 관리"
          boldSmText="부서 · 소속 · 역할 변경 / 계정 승인 "
        />
        <AdminAccountContainer/>
      </div>
    </div>
  );
}
