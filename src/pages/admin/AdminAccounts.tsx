import AdminAccountContainer from '../../components/admin/account/AdminAccountContainer';
import AuthGuard from '../../components/common/AuthGuard';
import {useTokenStore, useUserStore} from '../../store/store';
import AdminTopMenu from './common/AdminTopMenu';

export default function AdminAccounts() {
  const {isAuthenticated} = useTokenStore();
  const {role} = useUserStore();

  return (
    <AuthGuard isAuthenticated={isAuthenticated} userRole={role}>
      <div className="top-container">
        <div className="flex flex-col max-w-1200">
          <AdminTopMenu boldBlackText="계정 관리" boldSmText="부서 · 소속 · 역할 변경 / 계정 승인 " />
          <AdminAccountContainer />
        </div>
      </div>
    </AuthGuard>
  );
}
