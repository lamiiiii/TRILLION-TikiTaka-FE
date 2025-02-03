import AdminCategoryContainer from '../../components/admin/category/AdminCategoryContainer';
import AdminTopMenu from './common/AdminTopMenu';

export default function AdminCategory() {
  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200">
        <AdminTopMenu boldBlackText="카테고리 관리" boldSmText="카테고리 조회 · 등록 · 삭제 · 수정 " />
        <AdminCategoryContainer />
      </div>
    </div>
  );
}
