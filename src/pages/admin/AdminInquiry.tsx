import AdminInquiryContainer from "../../components/admin/inquiry/AdminInquiryContainer";
import AdminTopMenu from "./common/AdminTopMenu";

export default function AdminInquiry() {
  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200">
        <AdminTopMenu boldBlackText="문의 및 요청 관리"/>
        <AdminInquiryContainer/>
      </div>
    </div>
  );
}
