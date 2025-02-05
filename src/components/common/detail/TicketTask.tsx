import {useMemo, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import DropDown from '../Dropdown';

interface Task {
  id: number;
  content: string;
  status: '진행 전' | '진행 중' | '완료';
}

export default function TicketTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      const newTask: Task = {
        id: tasks.length + 1,
        content: inputValue,
        status: '진행 전',
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
      event.preventDefault();
    }
  };

  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? {...task, status: newStatus as '진행 전' | '진행 중' | '완료'} : task)));
  };

  // 완료된 태스크의 비율을 계산하는 메모이제이션된 값
  const progressPercentage = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter((task) => task.status === '완료').length;
    return Math.round((completedTasks / tasks.length) * 100);
  }, [tasks]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-body-bold">Task</label>
        <label className="text-body-bold">
          Progress: <span className="text-main2-3">{progressPercentage}%</span>
        </label>
      </div>

      <div className="relative w-full  p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15">
        <ul className="mt-2">
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.li
                key={index}
                initial={{opacity: 0, y: 5}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                transition={{duration: 0.5, ease: 'easeOut'}}
                className="bg-main text-white rounded-md p-5 my-2"
              >
                <div className="w-full flex items-center justify-between">
                  <div>#{index + 1}</div>
                  <DropDown
                    label="상태"
                    options={['진행 전', '진행 중', '완료']}
                    defaultSelected={task.status}
                    value={task.status}
                    onSelect={(status) => handleStatusChange(task.id, status)}
                    border={false}
                    textColor="white"
                  />
                </div>
                <p>{task.content}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <textarea
          className="w-[340px] h-[78px] text-subtitle-regular border border-gray-2 rounded-[4px] py-3 px-4 focus:border-main"
          placeholder="하위 태스크 추가"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
