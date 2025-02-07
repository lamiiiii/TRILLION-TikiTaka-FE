import {useState} from 'react';
import {AlertIcon, DownIcon} from '../../common/Icon';
import {AnimatePresence} from 'framer-motion';
import {useQuery} from '@tanstack/react-query';
import {getPendingApprovalCount} from '../../../api/service/tickets';
import PendingTicketFilter from './PendingTicketFilter';
import PendingTicketList from './PendingTicketList';

export default function TicketAwaitingList() {
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'전체' | '나의 요청'>('전체');

  const toggleListVisibility = () => {
    setIsListVisible((prev) => !prev);
  };

  //승인 대기 티켓 수 조회
  const {data: pendingApprovalCount} = useQuery({
    queryKey: ['pendingApprovalCount'],
    queryFn: getPendingApprovalCount,
    refetchInterval: 60000, // 1분마다 자동으로 데이터 갱신 (필요에 따라 조정)
  });

  return (
    <div>
      <button
        onClick={toggleListVisibility}
        className="flex items-center justify-between w-full h-15 bg-gray-1 border border-gray-2 rounded py-4 px-[30px] my-6"
      >
        <div className="flex items-center gap-2">
          <h1 className="text-title-bold">승인 대기</h1>
          {pendingApprovalCount && (
            <div className={`px-4 h-[16px] flex place-items-center rounded-full bg-gray-9 text-white mb-0.5`}>
              <div className="mt-0.5 text-caption-bold">{pendingApprovalCount?.totalPending}</div>
            </div>
          )}
          {pendingApprovalCount && (
            <div className={`px-4 h-[16px] flex place-items-center gap-1 rounded-full bg-error text-white mb-0.5`}>
              <AlertIcon />
              <div className="mt-0.5 text-caption-bold">{pendingApprovalCount?.totalPendingUrgent}</div>
            </div>
          )}
        </div>
        <div className={`transform ${isListVisible ? 'rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`}>
          <DownIcon />
        </div>
      </button>

      <AnimatePresence>
        {isListVisible && (
          <div>
            <PendingTicketFilter selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
            <PendingTicketList selectedFilter={selectedFilter} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
