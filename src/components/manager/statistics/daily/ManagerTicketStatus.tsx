import {useState} from 'react';
import ManagerItem from './ManagerItem';
import {useQuery} from '@tanstack/react-query';
import {getDailyManagerTicketSummary} from '../../../../api/service/statistics';

export default function ManagerTicketStatus() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const {data: managerData} = useQuery<ManagerTicketSummary[], Error>({
    queryKey: ['dailyManagerTicketSummary'],
    queryFn: getDailyManagerTicketSummary,
  });

  const totalPages = Math.ceil((managerData?.length ?? 0) / itemsPerPage);

  return (
    <div className="flex flex-col w-full h-[430px] bg-gray-18 p-5">
      <h1 className="text-title-bold">담당자별 티켓 처리 현황</h1>
      <div className="h-full relative flex flex-col items-center bg-white rounded border border-gray-2 py-10  mt-4 overflow-hidden">
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              width: `${totalPages * 100}%`,
              transform: `translateX(-${(currentPage * 100) / totalPages}%)`,
            }}
          >
            {Array.from({length: totalPages}).map((_, pageIndex) => (
              <div key={pageIndex} className="w-full flex justify-between mx-4">
                {managerData &&
                  managerData.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((manager, index) => (
                    <div key={index} className="w-1/3 px-1">
                      <ManagerItem
                        name={manager.userName}
                        email={manager.userEmail}
                        processing={manager.inProgressTickets}
                        completed={manager.doneTickets}
                        duration="N/A"
                      />
                    </div>
                  ))}
                {managerData &&
                  Array.from({
                    length: itemsPerPage - managerData.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).length,
                  }).map((_, index) => <div key={`empty-${index}`} className="w-1/3 px-1" />)}
              </div>
            ))}
          </div>
        </div>

        {/* 캐러셀 인디케이터 */}
        <div className="flex gap-2 mt-4">
          {Array.from({length: totalPages}).map((_, pageIndex) => (
            <button
              key={pageIndex}
              className={`w-2 h-2 rounded-full ${currentPage === pageIndex ? 'bg-main' : 'bg-gray-400'}`}
              onClick={() => goToPage(pageIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
