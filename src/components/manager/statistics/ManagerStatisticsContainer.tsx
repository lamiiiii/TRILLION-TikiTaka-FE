import {useState} from 'react';
import CategoryTicketStatus from '../../common/statistics/CategoryTicketStatus';
import TopMenu from '../../common/TopMenu';
import ManagerTicketStatus from './daily/ManagerTicketStatus';
import StatisticsFilter from './StatisticsFilter';

import TodayTicketStatus from './daily/TodayTicketStatus';
import ManagerTicketPeriodStatus from './monthly/ManagerTicketPeriodStatus';

export default function ManagerStatisticsContainer() {
  const [selectedFilter, setSelectedFilter] = useState('일별');

  return (
    <div className="flex flex-col max-w-1200 px-[46px]">
      <TopMenu boldBlackText="통계 관리" rightText="티켓 관리 대시보드 바로가기" linkTo="/manager" />
      <StatisticsFilter onFilterChange={setSelectedFilter} />

      {selectedFilter === '일별' ? (
        <section className="flex bg-gray-18 p-6 pb-[38px] mt-3 mb-[100px]">
          <div className="flex flex-col">
            <div className="w-full grid grid-cols-2">
              <TodayTicketStatus />
              <ManagerTicketStatus />
            </div>
            <CategoryTicketStatus />
          </div>
        </section>
      ) : (
        <section className="flex bg-gray-18 p-6 pb-[38px] mt-3 mb-[100px]">
          <div className="flex flex-col">
            <div className="w-full grid grid-cols-2">
              <ManagerTicketPeriodStatus />
              <TodayTicketStatus />
            </div>
            <CategoryTicketStatus />
          </div>
        </section>
      )}
    </div>
  );
}
