import {useState} from 'react';
import DropDown from '../../common/Dropdown';
import {CalendarIcon, StarIcon} from '../../common/Icon';
import Profile from '../../common/Profile';

interface TicketSmallProps {
  id: number;
  title: string;
  deadline: string;
  initialStatus: string;
}

export default function TicketSmall({id, title, deadline, initialStatus}: TicketSmallProps) {
  const [status, setStatus] = useState(initialStatus);
  const handleStatusChange = (selectedStatus: string) => {
    setStatus(selectedStatus);
  };
  console.log(deadline);

  return (
    <div className="bg-white border border-gray-2 rounded p-3">
      <div className="flex items-start">
        <div className="text-body-regular bg-gray-18 border border-gray-2 rounded px-2 mr-4">#{id}</div>
        <h1 className="w-[240px] text-subtitle-regular">{title}</h1>
      </div>
      <div className="flex items-center gap-2 mr-3">
        <CalendarIcon />
        <StarIcon />
        <div className="w-full flex justify-between items-center mt-1">
          <DropDown
            label="진행중"
            options={['진행중', '완료']}
            defaultSelected={initialStatus}
            onSelect={handleStatusChange}
            paddingX="px-5"
            border={false}
            value={status}
            textColor="text-gray-15"
          />
          <Profile name="Hong" backgroundColor="manager" size="sm" />
        </div>
      </div>
    </div>
  );
}
