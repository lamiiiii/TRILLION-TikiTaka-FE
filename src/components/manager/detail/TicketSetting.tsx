import {useState} from 'react';
import DropDown from '../../common/Dropdown';
import {useTicketStore} from '../../../store/store';
import {PRIORITY} from '../../../constants/constants';

export default function TicketSetting() {
  const [selectedAssignee, setSelectedAssignee] = useState('Yeon');
  const priority = useTicketStore((state) => state.priority);
  const setPriority = useTicketStore((state) => state.setPriority);
  const handlePrioritySelect = (selectedOption: string) => {
    setPriority(selectedOption);
  };

  const handleAssigneeSelect = (selectedOption: string) => {
    setSelectedAssignee(selectedOption);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-body-bold">티켓 설정</label>
      <div className="w-full p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15">
        <div className="grid grid-cols-[4fr_6fr] gap-4">
          <div className="text-subtitle flex flex-col gap-4">
            <p>assignees</p>
            <p>End Date</p>
            <p>Priority</p>
            <p>Primary Category</p>
            <p>Secondary Category</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <DropDown
                label="담당자"
                options={['Jojo', 'Alex', 'Yeon']}
                defaultSelected={selectedAssignee}
                onSelect={handleAssigneeSelect}
                border={false}
              />
            </div>
            <div className="flex itmes-center ml-3">
              <input type="date" className="w-min text-gray-6 text-body-regular" />
              <input type="time" className="w-min text-gray-6 text-body-regular" />
            </div>
            <DropDown label="우선 순위" options={PRIORITY} value={priority} onSelect={handlePrioritySelect} border={false} />
            <DropDown label="1차 카테고리" options={PRIORITY} value={priority} onSelect={handlePrioritySelect} border={false} />
            <DropDown label="2차 카테고리" options={PRIORITY} value={priority} onSelect={handlePrioritySelect} border={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
