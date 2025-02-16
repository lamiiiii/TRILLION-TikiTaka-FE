import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNewTicketFormStore, useNewTicketStore} from '../../../store/store';
import {ReferredIcon, RequiredIcon} from '../Icon';
import TicketOptions from '../ticket/TicketOptions';
import {updateTicket} from '../../../api/service/tickets';
import {useEffect, useState} from 'react';
import Modal from '../Modal';
import NewTicketContent from '../ticket/NewTicketContent';

interface TicketEditProps {
  ticketData: TicketDetails;
}

export default function TicketEdit({ticketData}: TicketEditProps) {
  const queryClient = useQueryClient();

  const {
    title,
    content,
    isUrgent,
    firstCategory,
    secondCategory,
    ticketType,
    dueDate,
    dueTime,
    // manager,
    setTitle,
    setContent,
    setIsUrgent,
    setFirstCategoryId,
    setSecondCategoryId,
    setTicketType,
    setDueDate,
    setDueTime,
    setManagerId,
    setFirstCategory,
    setSecondCategory,
    setManager,
    setIsEditing,
  } = useNewTicketStore();
  const {mustDescription} = useNewTicketFormStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasChanges) {
        event.returnValue = '변경 사항이 저장되지 않았습니다. 계속 진행하시겠습니까?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasChanges]);

  useEffect(() => {
    if (title || content || isUrgent || firstCategory || secondCategory || ticketType || dueDate || dueTime) {
      setHasChanges(true);
    }
  }, [title, content, isUrgent, firstCategory, secondCategory, ticketType, dueDate, dueTime]);

  // 기존 데이터를 상태에 설정
  useState(() => {
    setTitle(ticketData.title);
    setContent(ticketData.description);
    setIsUrgent(ticketData.urgent);
    setFirstCategoryId(ticketData.firstCategoryId);
    setSecondCategoryId(ticketData.secondCategoryId);
    setTicketType({typeId: ticketData.typeId, typeName: ticketData.typeName});
    setDueDate(ticketData.deadline.split(' ')[0]);
    setDueTime(ticketData.deadline.split(' ')[1]);
    setManagerId(-1);
  });

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert('마감기한은 오늘 이후 날짜를 선택해주세요.');
      setDueDate('');
    } else {
      setDueDate(e.target.value);
    }
  };

  const mutation = useMutation({
    mutationFn: async (updateData: UpdateTicketParams) => updateTicket(ticketData.ticketId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ticketDetails', ticketData.ticketId]});

      setTitle('');
      setContent('');
      setIsUrgent(false);
      setFirstCategoryId(0);
      setSecondCategoryId(0);
      setFirstCategory(null);
      setSecondCategory(null);
      setTicketType({typeId: 0, typeName: ''});
      setDueDate('');
      setDueTime('');
      setManagerId(0);
      setManager(null);
      setHasChanges(false);

      setModalMessage('티켓이 수정되었습니다.');
      setIsModalOpen(true);
    },
  });

  // 저장 버튼 클릭 시 실행되는 함수
  const handleSubmit = () => {
    const updatedTicket: UpdateTicketParams = {
      title,
      description: content,
      urgent: isUrgent,
      typeId: ticketType?.typeId,
      firstCategoryId: firstCategory?.id,
      secondCategoryId: secondCategory?.id,
      deadline: `${dueDate} ${dueTime}`,
    };

    mutation.mutate(updatedTicket);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col bg-bg-1 p-20 pt-10 gap-8 min-w-[600px]">
        <TicketOptions />
        {firstCategory && secondCategory && mustDescription && (
          <div className="flex items-center text-body-regular gap-3">
            <ReferredIcon />
            필수 입력 사항:
            <div className="text-error ">{mustDescription}</div>
          </div>
        )}
        <div className="flex flex-col gap-3 text-body-bold whitespace-nowrap">
          <div className="flex gap-10 items-center">
            <div className="flex items-center gap-1">
              마감 기한 <RequiredIcon />
            </div>
            <div className={`flex items-center gap-5 p-2 px-8 bg-white border border-gray-2`}>
              <input type="date" value={dueDate} onChange={handleDueDateChange} className="w-28 text-gray-6 text-body-regular" />
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-24 text-gray-6 text-body-regular"
              />
            </div>
          </div>
          <NewTicketContent />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <button onClick={handleSubmit} className="btn mb-4">
          티켓 수정
        </button>
      </div>
      {isModalOpen && (
        <Modal
          title="수정 완료"
          content={modalMessage}
          backBtn="닫기"
          onBackBtnClick={() => {
            setIsModalOpen(false);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
}
