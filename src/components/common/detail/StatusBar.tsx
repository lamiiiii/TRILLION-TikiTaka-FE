import DropDown from '../Dropdown';
import {PRIORITY, STATUS_MAP, STATUS_OPTIONS} from '../../../constants/constants';
import {useTicketStore, useUserStore} from '../../../store/store';
import {useEffect, useState} from 'react';
import {WhiteCheckIcon} from '../Icon';
import {useParams} from 'react-router-dom';
import {approveTicket, rejectTicket, updateTicketManager, updateTicketStatus, updateTicketUrgent} from '../../../api/service/tickets';
import useReverseMap from '../../../hooks/useReverseMap';
import {useUpdateTicketPriority} from '../../../api/hooks/useUpdateTicketPriority';
import {QUERY_KEY, useCreateMutation} from '../../../api/hooks/useCreateMutation';
import Modal from '../Modal';

interface StatusBarProps {
  data: TicketDetails;
  status?: keyof typeof STATUS_MAP;
}

export default function StatusBar({data, status}: StatusBarProps) {
  const REVERSE_STATUS_MAP = useReverseMap(STATUS_MAP);
  const [currentStatus, setCurrentStatus] = useState<string>(status ? STATUS_MAP[status] : '대기 중');
  const {priority, setPriority} = useTicketStore();
  const [isUrgent, setIsUrgent] = useState(data?.urgent);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {role, userId, userName} = useUserStore();
  const isUser = role === 'USER';

  const isApproved = ['IN_PROGRESS', 'REVIEW', 'DONE'].includes(status || '');
  const isRejected = currentStatus === '반려';

  const {id} = useParams();
  const ticketId = Number(id);

  useEffect(() => {
    if (data?.priority) {
      setPriority(data.priority);
    }
  }, [data?.priority, setPriority]);

  const updateUrgentMutation = useCreateMutation(
    () => updateTicketUrgent(ticketId, isUrgent),
    '티켓 긴급 여부 변경에 실패했습니다. 다시 시도해 주세요.',
    ticketId
  );

  const updateManagerMutation = useCreateMutation(
    (managerId: number) => updateTicketManager(ticketId, managerId),
    '티켓 담당자 변경에 실패했습니다. 다시 시도해 주세요.',
    ticketId
  );

  //티켓 상태 수정
  const updateStatusMutation = useCreateMutation<string>(
    (newStatus) => {
      const statusKey = REVERSE_STATUS_MAP[newStatus] as keyof typeof STATUS_MAP;
      return updateTicketStatus(ticketId, statusKey);
    },
    '티켓 상태 변경에 실패했습니다. 다시 시도해 주세요.',
    ticketId,
    [[QUERY_KEY.TICKET_DETAILS, QUERY_KEY.TICKET, String(ticketId)]]
  );

  //티켓 우선순위 수정
  const updatePriorityMutation = useUpdateTicketPriority(ticketId, {
    onSuccess: (data) => {
      setPriority(data.priority);
    },
  });

  // 티켓 승인
  const approveMutation = useCreateMutation(() => approveTicket(ticketId), '티켓 승인에 실패했습니다. 다시 시도해 주세요.', ticketId, [
    [QUERY_KEY.TICKET_DETAILS, String(ticketId)],
  ]);

  // 티켓 반려
  const rejectMutation = useCreateMutation(() => rejectTicket(ticketId), '티켓 반려에 실패했습니다. 다시 시도해 주세요.', ticketId, [
    [QUERY_KEY.TICKET_DETAILS, String(ticketId)],
  ]);

  useEffect(() => {
    if (status) {
      setCurrentStatus(STATUS_MAP[status]);
    }
  }, [status]);

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrgentState = e.target.checked;
    setIsUrgent(newUrgentState);
    updateUrgentMutation.mutate(newUrgentState);
  };

  const handlePrioritySelect = (selectedOption: string) => {
    if (isUser) return;
    updatePriorityMutation.mutate(selectedOption);
  };

  const handleStatusClick = (option: string) => {
    if (isUser) return;
    if (option === '진행 중' && data.managerId !== userId) {
      setIsModalOpen(true);
    } else {
      updateStatusMutation.mutate(option, {
        onSuccess: () => {
          setCurrentStatus(option);
        },
      });
    }
  };

  const handleApprove = () => {
    if (isUser) return;
    approveMutation.mutate(undefined, {
      onSuccess: () => setCurrentStatus('승인'),
    });
  };

  const handleReject = () => {
    if (isUser) return;
    rejectMutation.mutate(undefined, {
      onSuccess: () => setCurrentStatus('반려'),
    });
  };

  const handleSubmit = () => {
    updateManagerMutation
      .mutateAsync(userId)
      .then(() => updateStatusMutation.mutateAsync('진행 중'))
      .then(() => {
        setIsModalOpen(false);
      });
  };

  // 반려 상태가 아닐 때만 '반려'를 제외한 상태 옵션 표시
  const visibleStatusOptions = isRejected ? ['반려'] : STATUS_OPTIONS.filter((option) => option !== '반려');

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

        <section className="flex items-center gap-2">
          <label className="text-body-bold">Status</label>
          {visibleStatusOptions.map((option) => (
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
        </section>
      </div>

      <section className="flex items-center gap-2">
        <button
          onClick={handleApprove}
          className={`
    ${isApproved ? 'bg-main text-white' : 'bg-white text-main border border-main'}
    ${!isUser && 'hover:bg-main hover:text-white'}
    rounded-md py-1 px-6 text-caption-regular
  `}
        >
          승인
        </button>
        <button
          onClick={handleReject}
          className={`
    ${isRejected ? 'bg-main text-white' : 'bg-white text-main border border-main'}
    ${!isUser && 'hover:bg-main hover:text-white'}
    rounded-md py-1 px-6 text-caption-regular
 
  `}
        >
          반려
        </button>
      </section>

      {isModalOpen && (
        <Modal
          title="담당자 변경"
          content={`진행중으로 상태 변경시 담당자가 ${userName} 본인으로 변경됩니다.`}
          backBtn="취소"
          onBackBtnClick={() => setIsModalOpen(false)}
          checkBtn="확인"
          onBtnClick={handleSubmit}
        />
      )}
    </div>
  );
}
