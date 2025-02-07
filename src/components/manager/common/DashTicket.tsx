import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useUserStore} from '../../../store/store';
import {AlertIcon} from '../../common/Icon';
import TicketDropdown from './TicketDropdown';
import {useQuery} from '@tanstack/react-query';
import {getManagerList} from '../../../api/service/users';

interface DashTicketProps extends TicketListItem {
  detailLink: string; // 상세 조회 링크 추가
  onAssigneeChange?: (newAssignee: string) => void; // 선택한 담당자 변경 핸들러 (Optional로 설정)
  onApprove?: (ticketId: number) => void; // ✅ 승인 핸들러 추가
  onReject?: (ticketId: number) => void;
  onStatusChange: (ticketId: number, newStatus: string) => void;
}

export default function DashTicket({
  ticketId,
  title,
  typeName,
  description,
  firstCategoryName,
  secondCategoryName,
  managerName,
  status, // props로 받은 status만 사용
  urgent,
  deadline,
  detailLink,
  onAssigneeChange,
  onApprove,
  onReject,
  onStatusChange,
}: DashTicketProps) {
  const role = useUserStore((state) => state.role).toLowerCase();
  const [selectedAssignee, setSelectedAssignee] = useState(managerName ?? 'all');

  const handleAssigneeSelect = (selectedOption: string) => {
    setSelectedAssignee(selectedOption);
    if (onAssigneeChange) {
      onAssigneeChange(selectedOption);
    }
  };

  // 담당자 목록 불러오기 (React Query)
  const {data: managerData} = useQuery({
    queryKey: ['managers'],
    queryFn: getManagerList,
  });

  // 불러온 데이터에서 담당자 이름만 추출
  const managerList = managerData?.users.map((user) => user.username) || [];

  // 상태 변환 (영문 → 한글)
  const statusMapping: Record<string, string> = {
    PENDING: '대기중',
    IN_PROGRESS: '진행중',
    REVIEW: '검토 요청',
    DONE: '완료',
    REJECTED: '반려',
  };

  const reverseStatusMapping: Record<string, string> = {
    대기중: 'PENDING',
    진행중: 'IN_PROGRESS',
    완료: 'DONE',
  };

  // 긴급 티켓 스타일
  const ticketClass = urgent ? 'border-error bg-white hover:bg-red/5' : 'border-gray-2 bg-white hover:bg-gray-1';

  return (
    <div className={`flex gap-4 py-3 px-2 border items-center rounded cursor-pointer transition-all duration-200 ${ticketClass}`}>
      {/* 티켓 ID */}
      <Link to={detailLink} className="w-[6%] text-subtitle-regular text-gray-700 px-2">
        #{ticketId}
      </Link>
      {/* 카테고리 */}
      <Link to={detailLink} className="w-[12%] text-subtitle-regular">
        <span>{firstCategoryName || '1차 카테고리 미지정'}</span>
        <br />
        <span className="text-gray-6 text-body-regular">{secondCategoryName || '2차 카테고리 미지정'}</span>
      </Link>

      {/* 요청 내용 */}
      <Link to={detailLink} className={role === 'manager' ? 'w-[36%]' : 'w-[51%]'} style={{textAlign: 'left'}}>
        <div className="flex items-center gap-1">
          {urgent && <AlertIcon className="text-error w-4 h-4" />}
          <div className={`flex text-subtitle-regular ${urgent ? 'text-error' : 'text-gray-15'}`}>
            [{typeName}]<div className="ml-1">{title}</div>
          </div>
        </div>
        <div className="text-gray-6 text-body-regular">{description.length > 40 ? `${description.slice(0, 40)}...` : description}</div>
      </Link>

      {/* 기한 */}
      <Link to={detailLink} className="w-[12%] text-body-regular text-gray-15">
        {deadline}
      </Link>

      {/* 담당자 */}
      <div className="w-[10%]">
        <TicketDropdown
          label={selectedAssignee}
          options={managerList ?? []} // 실제 담당자 리스트 필요
          defaultSelected={selectedAssignee}
          onSelect={handleAssigneeSelect}
          paddingX="px-3"
          border={true}
          textColor="text-gray-15"
        />
      </div>
      <div className="w-[15%] flex gap-2">
        {status === 'PENDING' ? (
          <>
            <button
              className="px-6 h-[30px] text-[12px] leading-none border border-gray-6 rounded-md hover:bg-gray-8 hover:text-white"
              onClick={() => onApprove && onApprove(ticketId)} // ✅ 승인 핸들러 호출
            >
              승인
            </button>
            <button
              className="px-6 h-[30px] text-[12px] leading-none border border-gray-6 rounded-md hover:bg-error/80 hover:text-white"
              onClick={() => onReject && onReject(ticketId)} // ✅ 반려 핸들러 호출
            >
              반려
            </button>
          </>
        ) : status === 'IN_PROGRESS' || status === 'REVIEW' ? (
          <TicketDropdown
            label={statusMapping[status]} // 현재 상태 표시
            options={['대기중', '진행중', '완료']} // 가능한 옵션
            onSelect={(selectedStatus) => {
              const newStatus = reverseStatusMapping[selectedStatus];
              if (newStatus !== 'IN_PROGRESS') {
                onStatusChange(ticketId, newStatus);
              }
            }}
            paddingX="px-3"
            border={true}
            textColor="text-gray-15"
          />
        ) : (
          <div
            className={`px-10 h-[30px] text-[12px] leading-none border rounded-md flex items-center justify-center 
        ${status === 'DONE' ? 'bg-blue/15 text-body-regular ' : ''}
        ${status === 'REJECTED' ? 'bg-error/15 text-body-regular ' : ''}
        ${status !== 'DONE' && status !== 'REJECTED' ? 'bg-gray-1 text-gray-700 border-gray-6' : ''}
      `}
          >
            {statusMapping[status] || '상태 없음'}
          </div>
        )}
      </div>
    </div>
  );
}
