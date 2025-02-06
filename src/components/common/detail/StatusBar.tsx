import DropDown from '../Dropdown';
import {PRIORITY, STATUS_MAP, STATUS_OPTIONS} from '../../../constants/constants';
import {useTicketStore} from '../../../store/store';
import {useEffect, useState} from 'react';
import {WhiteCheckIcon} from '../Icon';
import {useParams} from 'react-router-dom';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateTicket, updateTicketPriority, updateTicketStatus} from '../../../api/service/tickets';

interface StatusBarProps {
  data: TicketDetails;
  status?: keyof typeof STATUS_MAP;
}

// STATUS_MAP의 키와 값을 뒤집은 객체 생성
const REVERSE_STATUS_MAP = Object.fromEntries(Object.entries(STATUS_MAP).map(([key, value]) => [value, key]));

export default function StatusBar({data, status}: StatusBarProps) {
  const [currentStatus, setCurrentStatus] = useState<string>(status ? STATUS_MAP[status] : '대기 중');
  const {priority, setPriority} = useTicketStore();
  const [isUrgent, setIsUrgent] = useState(data?.urgent);

  const isApproved = ['IN_PROGRESS', 'REVIEW', 'DONE'].includes(status || '');
  const isRejected = currentStatus === '반려';

  const {id} = useParams();
  const ticketId = Number(id);

  const queryClient = useQueryClient();

  // 티켓 긴급 여부 수정
  const updateUrgentMutation = useMutation({
    mutationFn: (urgent: boolean) =>
      updateTicket(ticketId, {
        title: data?.title || '',
        description: data?.description || '',
        urgent: urgent,
        typeId: data?.typeId,
        primaryCategoryId: data?.firstCategoryId,
        secondaryCategoryId: data?.secondCategoryId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ticketDetails', ticketId]});
    },
    onError: () => {
      alert('티켓 긴급 여부 변경에 실패했습니다. 다시 시도해 주세요.');
      setIsUrgent(!isUrgent); // 실패 시 상태를 원래대로 되돌림
    },
  });

  //티켓 상태 수정
  const updateStatusMutation = useMutation({
    mutationFn: (newStatus: string) => {
      // 한글 상태를 영문 키로 변환
      const statusKey = REVERSE_STATUS_MAP[newStatus] as keyof typeof STATUS_MAP;
      return updateTicketStatus(ticketId, statusKey);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ticket', ticketId]});
    },
    onError: () => {
      alert('티켓 상태 변경에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  //티켓 우선순위 수정
  // FIX: cors 해결 후 요청 형식 맞는지 검토하기
  const updatePriorityMutation = useMutation({
    mutationFn: (newPriority: string) => updateTicketPriority(ticketId, newPriority),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['ticket', ticketId]});
      setPriority(data.priority); // API 응답의 priority로 전역 상태 업데이트
    },
    onError: () => {
      alert('티켓 우선순위 변경에 실패했습니다. 다시 시도해 주세요.');
    },
  });

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
    updatePriorityMutation.mutate(selectedOption);
  };

  const handleStatusClick = (option: string) => {
    setCurrentStatus(option);
    updateStatusMutation.mutate(option);
  };

  const handleApprove = () => {
    // 승인 로직 구현
    updateStatusMutation.mutate('승인');
  };

  const handleReject = () => {
    // 반려 로직 구현
    updateStatusMutation.mutate('반려');
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
              {updateStatusMutation.isPending && currentStatus === option ? 'Updating...' : option}
            </button>
          ))}
        </section>
      </div>
      <section className="flex items-center gap-2">
        <button
          onClick={handleApprove}
          className={`${
            isApproved ? 'bg-main text-white' : 'bg-white text-main border border-main hover:bg-main hover:text-white'
          } rounded-md py-1 px-6 text-caption-regular`}
        >
          승인
        </button>
        <button
          onClick={handleReject}
          className={`${
            isRejected ? 'bg-main text-white' : 'bg-white text-main border border-main hover:bg-main hover:text-white'
          } rounded-md py-1 px-6 text-caption-regular`}
        >
          반려
        </button>
      </section>
    </div>
  );
}
