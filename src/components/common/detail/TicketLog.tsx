import {useQuery} from '@tanstack/react-query';
import {getChangeHistory} from '../../../api/service/histories';
import {useUserStore} from '../../../store/store';

export default function TicketLog() {
  const {userId} = useUserStore();

  const {data: logData, isLoading} = useQuery({
    queryKey: ['ticketHistory', userId],
    queryFn: () => getChangeHistory(Number(userId)),
  });

  return (
    <div className="flex flex-col gap-1 ">
      <label className="text-body-bold">Log</label>
      <div className="w-full p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15 h-[300px] max-h-[300px] overflow-y-scroll">
        {isLoading ? (
          <div className="text-gray-500 text-center py-4">Loading...</div>
        ) : logData?.content && logData.content.length > 0 ? (
          logData.content.map((log) => (
            <div key={log.id} className="bg-main text-white rounded-md p-4 my-2 flex flex-col">
              <div className="flex gap-2">
                <p className="text-body-regular">{log.updatedByUsername}</p>
                <p className="text-body-regular">{log.updateType}</p>
              </div>
              <p className="text-body-bold">{log.ticketTitle}</p>
              <p className="text-caption-regular text-right mt-1">{new Date(log.updatedAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-4">해당 티켓 변경 이력이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
