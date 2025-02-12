import AdminInquiryContainer from '../../components/admin/inquiry/AdminInquiryContainer';
import AuthGuard from '../../components/common/AuthGuard';
import {useTokenStore, useUserStore} from '../../store/store';
import AdminTopMenu from './common/AdminTopMenu';

export default function AdminInquiry() {
  const {isAuthenticated} = useTokenStore();
  const {role} = useUserStore();

  return (
    <AuthGuard isAuthenticated={isAuthenticated} userRole={role}>
      <div className="top-container">
        <div className="flex flex-col max-w-1200">
          <AdminTopMenu boldBlackText="문의 및 요청 관리" />
          <AdminInquiryContainer />
        </div>
      </div>
    </AuthGuard>
  );
}
