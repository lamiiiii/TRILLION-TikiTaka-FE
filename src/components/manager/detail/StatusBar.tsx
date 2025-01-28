import {useState} from 'react';
import DropDown from '../../common/Dropdown';
import {PRIORITY, STATUS_OPTIONS} from '../../../constants/constants';
import {PriorityType} from '../../../interfaces/interfaces';

interface StatusBarProps {
  priority: PriorityType;
  status: (typeof STATUS_OPTIONS)[number];
}
export default function StatusBar({priority, status}: StatusBarProps) {
  const [selectedPriority, setSelectedPriority] = useState<PriorityType>(priority);
  const handleStatusSelect = (selectedOption: string) => {
    setSelectedPriority(selectedOption as PriorityType);
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex items-center gap-2 mr-2">
        <label className="text-body-bold">Priority</label>
        <DropDown label="Priority" options={PRIORITY} defaultSelected={selectedPriority} onSelect={handleStatusSelect} />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-body-bold">Status</label>

        {STATUS_OPTIONS.map((option) => (
          <div
            key={option}
            className={`${status === option ? 'bg-main text-white' : 'bg-white-100'} rounded-md py-1 px-6 text-caption-regular border border-main`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}
