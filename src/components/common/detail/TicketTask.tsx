import {useMemo, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {createSubtask, deleteSubtask, getSubtasks, updateSubtaskDescription, updateSubtaskStatus} from '../../../api/service/subtasks';
import {useParams} from 'react-router-dom';
import {WhiteCheckIcon} from '../Icon';

export default function TicketTask() {
  const [inputValue, setInputValue] = useState('');
  const [editedContent, setEditedContent] = useState<string>(''); // 1. 타입 명시적 선언
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

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

  //하위 태스크 상태 변경
  const updateSubtaskStatusMutation = useMutation({
    mutationFn: ({taskId, checked}: {taskId: number; checked: boolean}) => updateSubtaskStatus(ticketId, taskId, checked),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['subtasks', ticketId]});
    },
    onError: () => {
      alert('하위 태스크 상태 업데이트에 실패했습니다.');
    },
  });

  // 하위 태스크 수정
  const updateSubtaskMutation = useMutation({
    mutationFn: ({taskId, description}: {taskId: number; description: string}) => updateSubtaskDescription(taskId, {description}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['subtasks', ticketId]});
      setEditingTaskId(null);
      setEditedContent(''); // 2. 성공 시 내용 초기화
    },
  });

  // 하위 태스크 삭제
  const deleteSubtaskMutation = useMutation({
    mutationFn: (taskId: number) => deleteSubtask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['subtasks', ticketId]});
    },
  });

  const handleStatusChange = (subtaskId: number, checked: boolean) => {
    updateSubtaskStatusMutation.mutate({taskId: subtaskId, checked});
  };

  const handleEdit = (taskId: number, currentContent: string) => {
    setEditingTaskId(taskId);
    setEditedContent(currentContent);
  };

  const handleSave = (taskId: number) => {
    if (editedContent && editedContent.trim()) {
      updateSubtaskMutation.mutate({
        taskId,
        description: editedContent,
      });
    }
  };
  const handleCancel = () => {
    setEditingTaskId(null);
    setEditedContent('');
  };

  const handleDelete = (taskId: number) => {
    if (window.confirm('정말로 이 태스크를 삭제하시겠습니까?')) {
      deleteSubtaskMutation.mutate(taskId);
    }
  };

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

  // 진행률 계산
  const progressPercentage = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter((task) => task.done).length;
    return Math.round((completedTasks / tasks.length) * 100);
  }, [tasks]); // tasks가 변경될 때마다 재계산

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
                className="bg-main text-white rounded-md p-3 my-2"
              >
                <div className="w-full flex items-center justify-between mb-2">
                  {/* 태스크 완료 섹션 */}
                  <section className="flex gap-3 items-center mr-4">
                    <label
                      className={`flex items-center justify-center w-4 h-4 border rounded-md cursor-pointer 
                        ${task.done ? 'bg-main border-main' : 'border-gray-2 hover:border-main'}`}
                    >
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => handleStatusChange(task.subtaskId, !task.done)}
                        className="hidden"
                      />
                      {task.done && <WhiteCheckIcon />}
                    </label>
                    <p className={`${task.done ? 'text-main text-body-bold' : 'text-gray-6 text-body-regular'}`}>완료</p>
                  </section>

                  <section>
                    <div className="flex gap-1 text-gray-3 text-body-regular ">
                      {editingTaskId === task.subtaskId ? (
                        <>
                          <button className="hover:text-gray-15" onClick={() => handleSave(task.subtaskId)}>
                            저장
                          </button>
                          <button className="hover:text-gray-15" onClick={handleCancel}>
                            취소
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(task.subtaskId, task.description)} className="hover:text-gray-15 ">
                            편집
                          </button>
                          <button onClick={() => handleDelete(task.subtaskId)} className="hover:text-gray-15">
                            삭제
                          </button>
                        </>
                      )}
                    </div>
                  </section>
                </div>
                {editingTaskId === task.subtaskId ? (
                  <textarea
                    className="w-full p-2 border rounded text-main"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                ) : (
                  <p className={task.done ? 'line-through' : ''}>{task.description}</p>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <textarea
          className="w-full h-[78px] text-subtitle-regular border border-gray-2 rounded-[4px] py-3 px-4 focus:border-main"
          placeholder="하위 태스크 추가"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
