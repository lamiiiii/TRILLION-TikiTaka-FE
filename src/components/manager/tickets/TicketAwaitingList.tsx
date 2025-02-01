import {useState} from 'react';
import {AlertIcon, DownIcon} from '../../common/Icon';
import TicketList from '../home/TicketList';
import TicketFilter from './TicketFilter';
import {motion, AnimatePresence} from 'framer-motion';

export default function TicketAwaitingList() {
  const [isListVisible, setIsListVisible] = useState(false);

  const toggleListVisibility = () => {
    setIsListVisible((prev) => !prev);
  };
  return (
    <div>
      <button
        onClick={toggleListVisibility}
        className="flex items-center justify-between w-full h-15 bg-gray-1 border border-gray-2 rounded py-4 px-[30px] my-6"
      >
        <div className="flex items-center gap-2">
          <h1 className="text-title-bold">승인 대기</h1>
          <div className={`px-4 h-[16px] flex place-items-center rounded-full bg-gray-9 text-white mb-0.5`}>
            <div className="mt-0.5 text-caption-bold">{240}</div>
          </div>
          <div className={`px-4 h-[16px] flex place-items-center gap-1 rounded-full bg-error text-white mb-0.5`}>
            <AlertIcon />
            <div className="mt-0.5 text-caption-bold">{2}</div>
          </div>
        </div>
        <div className={`transform ${isListVisible ? 'rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`}>
          <DownIcon />
        </div>
      </button>

      <AnimatePresence>
        {isListVisible && (
          <motion.div initial={{opacity: 0, height: 0, y: -20}} animate={{opacity: 1, height: 'auto', y: 0}} transition={{duration: 0.3}}>
            <TicketFilter />
            <TicketList />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
