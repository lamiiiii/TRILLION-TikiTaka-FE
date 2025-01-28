import DropDown from '../../common/Dropdown';
import {PRIORITY, STATUS_OPTIONS} from '../../../constants/constants';
import {useTicketStore} from '../../../store/store';

interface StatusBarProps {
  status: (typeof STATUS_OPTIONS)[number];
}
export default function StatusBar({status}: StatusBarProps) {
  const priority = useTicketStore((state) => state.priority);
  const setPriority = useTicketStore((state) => state.setPriority);
  const handlePrioritySelect = (selectedOption: string) => {
    setPriority(selectedOption);
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex items-center gap-2 mr-2">
        <label className="text-body-bold">Priority</label>
        <DropDown label="Priority" options={PRIORITY} value={priority} onSelect={handlePrioritySelect} />
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
