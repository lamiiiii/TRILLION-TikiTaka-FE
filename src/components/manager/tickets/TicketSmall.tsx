import {forwardRef, useEffect, useRef, useState} from 'react';
import DropDown from '../../common/Dropdown';
import {StarIcon} from '../../common/Icon';
import Profile from '../../common/Profile';
import {Link} from 'react-router-dom';
import {PRIORITY, PRIORITY_COLOR, TicketStatus} from '../../../constants/constants';

interface TicketSmallProps {
  id: number;
  title: string;
  deadline: string;
  initialStatus: string;
  assignee: string;
  priority: string;
  onStatusChange: (id: number, newStatus: TicketStatus) => void;
  [key: string]: any;
}

const TicketSmall = forwardRef<HTMLDivElement, TicketSmallProps>(
  ({id, title, deadline, assignee, initialStatus, onStatusChange, ...props}, ref) => {
    const [status, setStatus] = useState(initialStatus);
    const [showPriority, setShowPriority] = useState(false);
    const [priority, setPriority] = useState('');
    const priorityRef = useRef<HTMLDivElement>(null);

    const handleStatusChange = (selectedStatus: TicketStatus) => {
      setStatus(selectedStatus);
      onStatusChange(id, selectedStatus);
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

    return (
      <div ref={ref} {...props} className="relative bg-white border border-gray-2 rounded p-3 hover:border-main">
        <div className="flex items-start">
          <div className="text-body-regular bg-gray-18 border border-gray-2 rounded px-2 mr-4">#{id}</div>
          <Link className="group relative" to={`/manager/detail/${id}`}>
            <h1 className="w-[240px] h-[40px] text-subtitle-regular group-hover:text-main hover:underline  overflow-hidden text-ellipsis line-clamp-2">
              {title}
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-2 mr-3 mt-4">
          <div className="relative" ref={priorityRef}>
            <button
              onClick={() => setShowPriority(!showPriority)}
              className={`flex items-center justify-center ${priority ? 'px-4 py-1 rounded border border-gray-2 text-caption-bold ' : ''}`}
              style={{
                color: priority ? PRIORITY_COLOR[priority as keyof typeof PRIORITY_COLOR] : 'transparent',
                borderColor: priority ? PRIORITY_COLOR[priority as keyof typeof PRIORITY_COLOR] : 'transparent',
              }}
            >
              {priority || <StarIcon color="#727586" />}
              <span className="absolute inset-[-10px]" aria-hidden="true" />
            </button>
            {showPriority && (
              <div className="absolute z-50 bg-white border border-gray-2 rounded shadow-md mt-1 p-2 min-w-[106px] overflow-hidden">
                {PRIORITY.map((item) => (
                  <div
                    key={item}
                    className={`px-4 py-1.5 h-6 mt-1 text-center cursor-pointer leading-none rounded
                    border border-transparent transition-all duration-100 text-caption-regular ${
                      priority === item ? 'bg-gray-1 text-caption-bold text-gray-15 border-gray-2' : 'text-gray-700 hover:bg-gray-1'
                    }`}
                    onClick={() => handlePrioritySelect(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full flex justify-between items-center mt-1">
            <DropDown
              label="진행 중"
              options={['대기 중', '진행 중', '진행 완료']}
              defaultSelected={initialStatus}
              onSelect={handleStatusChange as (value: string) => void}
              paddingX="px-5"
              border={false}
              value={status}
              textColor="text-gray-15"
            />
            <Profile name={assignee} backgroundColor="MANAGER" size="sm" />
          </div>
        </div>
      </div>
    );
  }
);

export default TicketSmall;
