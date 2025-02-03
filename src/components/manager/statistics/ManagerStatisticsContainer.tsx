import TopMenu from '../../common/TopMenu';
import TicketStatusByManager from './TicketStatusByManager';
import TodayTicketStatus from './TodayTicketStatus';

export default function ManagerStatisticsContainer() {
  return (
    <div className="flex flex-col max-w-1200 pt-[30px] px-[46px]">
      <TopMenu boldBlackText="통계 관리" rightText="티켓 관리 대시보드 바로가기" linkTo="/manager" />
      <section className="flex bg-gray-18 p-6 pb-[38px] mt-3 mb-[100px]">
        <div className="w-full grid grid-cols-2">
          <TodayTicketStatus />
          <TicketStatusByManager />
        </div>
      </section>
    </div>
  );
}
