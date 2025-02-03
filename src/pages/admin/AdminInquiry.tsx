// 담당자 - 티켓 관리 대시보드 (전체)


import TopMenu from '../../components/common/TopMenu';

export default function AdminInquiry() {
  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200">
        <TopMenu
          boldBlackText="Dashboard"
          boldGrayText="티켓 관리 대시보드"
          rightText="나의 티켓 관리 바로가기"
          linkTo="/manager/tickets"
        />
        
      </div>
    </div>
  );
}
