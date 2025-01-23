import TopMenu from '../../components/common/TopMenu';

export default function ManagerStatistics() {
  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200">
        <TopMenu boldBlackText="통계 관리" rightText="티켓 관리 대시보드 바로가기" linkTo="/manager" />
      </div>
    </div>
  );
}
