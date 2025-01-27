import {useState} from 'react';
import DropDown from '../../common/Dropdown';

export default function TicketSetting() {
  const [selectedAssignee, setSelectedAssignee] = useState('Jojo');
  const [selectedEndDate, setSelectedEndDate] = useState('2025.01.02 15:00');
  const [selectedPriority, setSelectedPriority] = useState('HIGH');
  const [selectedProgress, setSelectedProgress] = useState('10%');

  const handleAssigneeSelect = (selectedOption: string) => {
    setSelectedAssignee(selectedOption);
  };

  const handleEndDateSelect = (selectedOption: string) => {
    setSelectedEndDate(selectedOption);
  };

  const handlePrioritySelect = (selectedOption: string) => {
    setSelectedPriority(selectedOption);
  };

  const handleProgressSelect = (selectedOption: string) => {
    setSelectedProgress(selectedOption);
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-body-bold">티켓 설정</label>
      <div className="w-full p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-subtitle flex flex-col gap-4">
            <p>assignees</p>
            <p>End Date</p>
            <p>Priority</p>
            <p>Progress</p>
          </div>

          <div className="flex flex-col gap-[7px]">
            <div className="flex items-center gap-2">
              <DropDown
                label="담당자"
                options={['Jojo', 'Alex', 'Yeon']}
                defaultSelected={selectedAssignee}
                onSelect={handleAssigneeSelect}
                border={false}
              />
            </div>
            <DropDown
              label="마감 기한"
              options={['2025.01.02 15:00', '2025.01.02 16:00', '2025.01.02 17:00']}
              defaultSelected={selectedEndDate}
              onSelect={handleEndDateSelect}
              border={false}
            />
            <DropDown
              label="우선 순위"
              options={['HIGH', 'MEDIUM', 'LOW']}
              defaultSelected={selectedPriority}
              onSelect={handlePrioritySelect}
              border={false}
            />
            <DropDown
              label="진행도"
              options={['10%', '30%', '60%']}
              defaultSelected={selectedProgress}
              onSelect={handleProgressSelect}
              border={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
