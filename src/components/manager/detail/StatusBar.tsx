import {useState} from 'react';
import DropDown from '../../common/Dropdown';

interface StatusBarProps {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: (typeof STATUS_OPTIONS)[number];
}

const STATUS_OPTIONS = ['대기 중', '진행 중', '진행 완료'];

export default function StatusBar({priority, status}: StatusBarProps) {
  const [selectedPriority, setSelectedPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>(priority);
  const handleStatusSelect = (selectedOption: string) => {
    setSelectedPriority(selectedOption as 'HIGH' | 'MEDIUM' | 'LOW');
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex items-center gap-2 mr-2">
        <label className="text-body-bold">Priority</label>
        <DropDown label="Priority" options={['HIGH', 'MEDIUM', 'LOW']} defaultSelected={selectedPriority} onSelect={handleStatusSelect} />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-body-bold">Status</label>

        {STATUS_OPTIONS.map((option) => (
          <button
            key={option}
            className={`${status === option ? 'bg-main text-white' : 'bg-white-100'} rounded-md py-1 px-6 text-body-regular border border-main`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
