import {TicketDataProps} from '../../../interfaces/ticket';
import Profile from '../../common/Profile';

interface TicketDetailProps {
  data: TicketDataProps;
}
export default function TicketDetail({data}: TicketDetailProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-body-bold">티켓 상세</label>
      <div className="w-full p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-subtitle flex flex-col gap-4">
            <p>assignees</p>
            <p>Primary Category</p>
            <p>Secondary Category</p>
            <p>Requester</p>
            <p>Request Date</p>
            <p>End Date</p>
          </div>

          <div className="flex flex-col gap-[7px]">
            <div className="flex items-center gap-2">
              <Profile name={data?.assignee} backgroundColor="manager" size="md" />
              <span>{data?.assignee}</span>
            </div>
            <p>{data?.category}</p>
            <p>{data?.subCategory}</p>
            <p>홍길동 (BE 1팀)</p>
            <p>2025.01.02 15:00</p>
            <p>{data?.deadline}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
