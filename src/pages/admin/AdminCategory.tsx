import AdminCategoryContainer from '../../components/admin/category/AdminCategoryContainer';
import AuthGuard from '../../components/common/AuthGuard';
import {useTokenStore, useUserStore} from '../../store/store';
import AdminTopMenu from './common/AdminTopMenu';

export default function AdminCategory() {
  const {isAuthenticated} = useTokenStore();
  const {role} = useUserStore();

  return (
    <AuthGuard isAuthenticated={isAuthenticated} userRole={role}>
      <div className="top-container">
        <div className="flex flex-col max-w-1200">
          <AdminTopMenu boldBlackText="카테고리 관리" boldSmText="카테고리 조회 · 등록 · 삭제 · 수정 " />
          <AdminCategoryContainer />
        </div>
      </div>
    </AuthGuard>
  );
}
