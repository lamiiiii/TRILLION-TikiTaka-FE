import AdminStatContainer from '../../components/admin/statistics/AdminStatContainer';
import AuthGuard from '../../components/common/AuthGuard';
import { useTokenStore, useUserStore } from '../../store/store';
import AdminTopMenu from './common/AdminTopMenu';

export default function AdminStatistics() {
  const {isAuthenticated} = useTokenStore();
  const {role} = useUserStore();

  return (
    <AuthGuard isAuthenticated={isAuthenticated}  userRole={role}>
      return (
      <div className="top-container">
        <div className="flex flex-col max-w-1200">
          <AdminTopMenu boldBlackText="통계 관리" />
          <AdminStatContainer />
        </div>
      </div>
    </AuthGuard>
  );
}
