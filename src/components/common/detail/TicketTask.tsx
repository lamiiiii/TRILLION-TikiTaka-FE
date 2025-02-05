import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {createSubtask, getSubtasks} from '../../../api/service/subtasks';
import {useParams} from 'react-router-dom';

export default function TicketTask() {
  const [inputValue, setInputValue] = useState('');

  const {id} = useParams();
  const ticketId = Number(id);
  const queryClient = useQueryClient();

  // 하위 태스크 조회
  const {data: tasks = []} = useQuery({
    queryKey: ['subtasks', ticketId],
    queryFn: () => getSubtasks(ticketId),
  });

  // 하위 태스크 작성
  const createSubtaskMutation = useMutation({
    mutationFn: createSubtask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', ticketId],
      });
    },
    onError: () => {
      alert('하위 태스크 추가에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      const newTaskParams: CreateSubtaskParams = {
        ticketId,
        description: inputValue,
      };
      createSubtaskMutation.mutate(newTaskParams);
      setInputValue('');
      event.preventDefault();
    }
  };

  // 상태 변경 핸들러 (서버 업데이트 로직 추가 필요)
  // const handleStatusChange = (taskId: number, newStatus: SubtaskItem['status']) => {
  //   // 임시 로컬 상태 업데이트
  //   queryClient.setQueryData(
  //     ['subtasks', ticketId],
  //     (old: SubtaskItem[] | undefined) => old?.map((task) => (task.id === taskId ? {...task, status: newStatus} : task)) || []
  //   );
  // };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-body-bold">Task</label>
        <label className="text-body-bold">
          Progress: <span className="text-main2-3">{'10'}%</span>
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
                <div className="w-full flex items-center justify-between">{/* 완료 체크 */}</div>
                <p>{task.description}</p>
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
