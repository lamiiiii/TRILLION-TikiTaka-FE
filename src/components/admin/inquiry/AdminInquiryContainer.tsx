import AdminTopMenu from '../AdminTopMenu';
import InquiryList from './InquiryList';

export default function AdminInquiryContainer() {
  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200">
        <AdminTopMenu boldBlackText="문의 및 요청 관리" />
        <InquiryList />
      </div>
    </div>
  );
}
