import {useState} from 'react';
import CategoryTicketStatus from '../../common/statistics/CategoryTicketStatus';

import ManagerTicketStatus from './daily/ManagerTicketStatus';
import StatFilter from './StatFilter';

import TodayTicketStatus from './daily/TodayTicketStatus';
import ManagerTicketPeriodStatus from './monthly/ManagerTicketPeriodStatus';
import ManagerPeriod from './monthly/ManagerPeriod';

export default function AdminStatContainer() {
  const [selectedFilter, setSelectedFilter] = useState('일별');

  return (
    <div className="flex flex-col max-w-1200 px-[46px]">
    
      <StatFilter onFilterChange={setSelectedFilter} />

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
              <ManagerPeriod />
            </div>
            <CategoryTicketStatus />
          </div>
        </section>
      )}
    </div>
  );
}
