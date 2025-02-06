import {useEffect, useState} from 'react';
import DropDown from '../Dropdown';
import {useTicketStore} from '../../../store/store';
import {PRIMARY_CATEGORIES, PRIORITY, SECONDARY_CATEGORIES, TICKET_TYPES} from '../../../constants/constants';

interface TicketSettingProps {
  data: TicketDetails;
}

export default function TicketSetting({data}: TicketSettingProps) {
  const [selectedAssignee, setSelectedAssignee] = useState(data.managerName);
  const [primaryCategory, setPrimaryCategory] = useState(data.firstCategoryName);
  const [secondaryCategory, setSecondaryCategory] = useState(data.secondCategoryName);
  const [ticketType, setTicketType] = useState(data.typeName);
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');

  const priority = useTicketStore((state) => state.priority);
  const setPriority = useTicketStore((state) => state.setPriority);

  useEffect(() => {
    if (data.deadline) {
      const [date, time] = data.deadline.split(' ');
      setDeadlineDate(date);
      setDeadlineTime(time);
    }
  }, [data.deadline]);

  const handlePrioritySelect = (selectedOption: string) => {
    setPriority(selectedOption);
  };

  const handleAssigneeSelect = (selectedOption: string) => {
    setSelectedAssignee(selectedOption);
  };

  const handlePrimaryCategorySelect = (selectedOption: string) => {
    setPrimaryCategory(selectedOption);
  };

  const handleSecondaryCategorySelect = (selectedOption: string) => {
    setSecondaryCategory(selectedOption);
  };

  const handleTicketTypeSelect = (selectedOption: string) => {
    setTicketType(selectedOption);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-body-bold">티켓 설정</label>
      <div className="w-full p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15">
        <div className="grid grid-cols-[4fr_6fr] gap-4">
          <div className="text-subtitle flex flex-col gap-4">
            <p>담당자</p>
            <p>마감 기한</p>
            {location.pathname.startsWith('/manager') && <p>Priority</p>}
            <p>1차 카테고리</p>
            <p>2차 카테고리</p>
            <p>티켓 유형</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <DropDown
                label="담당자"
                value={selectedAssignee}
                options={['Jojo', 'Alex', 'Yeon']}
                defaultSelected={selectedAssignee}
                onSelect={handleAssigneeSelect}
                border={false}
              />
            </div>
            <div className="flex itmes-center ml-3">
              <input
                type="date"
                value={deadlineDate}
                className={`${deadlineDate ? 'text-gray-15' : 'text-gray-6'} w-min text-body-regular`}
              />
              <input
                type="time"
                value={deadlineTime}
                className={`${deadlineTime ? 'text-gray-15' : 'text-gray-6'} w-min text-body-regular`}
              />
            </div>
            {location.pathname.startsWith('/manager') && (
              <DropDown label="우선 순위" options={PRIORITY} value={priority} onSelect={handlePrioritySelect} border={false} />
            )}
            <DropDown
              label="1차 카테고리"
              options={PRIMARY_CATEGORIES}
              value={primaryCategory}
              onSelect={handlePrimaryCategorySelect}
              border={false}
            />
            <DropDown
              label="2차 카테고리"
              options={primaryCategory ? SECONDARY_CATEGORIES[primaryCategory as keyof typeof SECONDARY_CATEGORIES] : []}
              value={secondaryCategory}
              onSelect={handleSecondaryCategorySelect}
              border={false}
              disabled={!primaryCategory}
            />
            <DropDown label="타입" options={TICKET_TYPES} value={ticketType} onSelect={handleTicketTypeSelect} border={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
