import DropDown from '../Dropdown';
import {PRIORITY, STATUS_OPTIONS} from '../../../constants/constants';
import {useTicketStore} from '../../../store/store';
import {useState} from 'react';
import {WhiteCheckIcon} from '../Icon';

interface StatusBarProps {
  status: (typeof STATUS_OPTIONS)[number];
}

export default function StatusBar({status}: StatusBarProps) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const {priority, setPriority} = useTicketStore();
  const [isUrgent, setIsUrgent] = useState(false);

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsUrgent(isChecked);
  };

  const handlePrioritySelect = (selectedOption: string) => {
    setPriority(selectedOption);
  };

  const handleStatusClick = (option: string) => {
    setCurrentStatus(option);
  };

  return (
    <div className="flex justify-between items-center gap-2 mt-2">
      <div className="flex items-center gap-4">
        <section className="flex gap-3 items-center mr-4">
          <label
            className={`flex items-center justify-center w-4 h-4 border rounded-md cursor-pointer 
                            ${isUrgent ? 'bg-error border-error' : 'border-gray-2 hover:border-error'}`}
          >
            <input type="checkbox" checked={isUrgent} onChange={checkboxChange} className="hidden" />
            {isUrgent && <WhiteCheckIcon />}
          </label>{' '}
          <p className={` ${isUrgent ? 'text-error text-body-bold' : 'text-gray-6 text-body-regular'}`}>긴급</p>
        </section>

        {location.pathname.startsWith('/manager') && (
          <div className="flex items-center gap-2 mr-2">
            <label className="text-body-bold">Priority</label>
            <DropDown label="Priority" options={PRIORITY} value={priority} onSelect={handlePrioritySelect} />
          </div>
        )}

        <div className="flex items-center gap-2">
          <label className="text-body-bold">Status</label>
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => handleStatusClick(option)}
              className={`${
                currentStatus === option ? 'bg-main text-white' : 'bg-white-100'
              } rounded-md py-1 px-6 text-caption-regular border border-main`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
