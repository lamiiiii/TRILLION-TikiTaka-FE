import {useEffect, useRef, useState} from 'react';
import DropDown from '../../common/Dropdown';
import {CalendarIcon, StarIcon} from '../../common/Icon';
import Profile from '../../common/Profile';
import {Link} from 'react-router-dom';
import {PRIORITY, PRIORITY_COLOR} from '../../../constants/constants';

interface TicketSmallProps {
  id: number;
  title: string;
  deadline: string;
  initialStatus: string;
}

export default function TicketSmall({id, title, deadline, initialStatus}: TicketSmallProps) {
  const [status, setStatus] = useState(initialStatus);
  const [showPriority, setShowPriority] = useState(false);
  const [priority, setPriority] = useState('');
  const priorityRef = useRef<HTMLDivElement>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleStatusChange = (selectedStatus: string) => {
    setStatus(selectedStatus);
  };

  const handlePrioritySelect = (selectedOption: string) => {
    setPriority(selectedOption);
    setShowPriority(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (priorityRef.current && !priorityRef.current.contains(event.target as Node)) {
        setShowPriority(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  console.log(priority, deadline);

  return (
    <div className="bg-white border border-gray-2 rounded p-3">
      <div className="flex items-start">
        <div className="text-body-regular bg-gray-18 border border-gray-2 rounded px-2 mr-4">#{id}</div>
        <Link className="group relative" to="/manager/detail">
          <h1 className="w-[240px] text-subtitle-regular group-hover:text-main hover:underline">{title}</h1>
        </Link>
      </div>
      <div className="flex items-center gap-2 mr-3 mt-4s">
        <div className="relative">
          <button className="focus:outline-none" onClick={() => setShowCalendar(!showCalendar)}>
            <CalendarIcon />
          </button>
          {/* TODO: 캘린더 추가 */}
        </div>

        <button className="relative">
          <button onClick={() => setShowPriority(!showPriority)}>
            <StarIcon
              color={
                PRIORITY_COLOR[priority as keyof typeof PRIORITY_COLOR] || '#727586' // 기본 색상
              }
            />
          </button>
          {showPriority && (
            <div className="absolute z-50 bg-white border border-gray-2 rounded shadow-md mt-1 p-2 min-w-[106px] overflow-hidden">
              {PRIORITY.map((item) => (
                <div
                  key={item}
                  className={`px-4 py-1.5 h-6 mt-1 text-center cursor-pointer leading-none rounded
          border border-transparent transition-all duration-100 text-caption-regular ${priority === item ? 'bg-gray-1 text-caption-bold text-gray-15 border-gray-2' : 'text-gray-700 hover:bg-gray-1  '}`}
                  onClick={() => handlePrioritySelect(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </button>
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
