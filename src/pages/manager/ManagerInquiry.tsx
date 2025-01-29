import TopMenu from '../../components/common/TopMenu';
import InquiryContainer from '../../components/manager/inquiry/InquiryContainer';

export default function ManagerInquiry() {
  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200">
        <TopMenu boldBlackText="문의 내역 확인" btnText="문의하기" onBtnClick={() => console.log('문의하기 모달')} />
        <InquiryContainer />
      </div>
    </div>
  );
}
