import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../../store/store'; // ✅ role 가져오기
import { AlertIcon } from '../../common/Icon';
import TicketDropdown from './TicketDropdown';

interface DashTicketProps extends TicketListItem {
  detailLink: string; // ✅ 상세 조회 링크 추가
  onAssigneeChange?: (newAssignee: string) => void; // ✅ 선택한 담당자 변경 핸들러 (Optional로 설정)
  onApprove?: () => void;
  onReject?: () => void;
}

export default function DashTicket({
  ticketId,
  title,
  typeName,
  description,
  firstCategoryName,
  secondCategoryName,
  managerName,
  status, // ✅ props로 받은 status만 사용
  urgent,
  deadline,
  detailLink,
  onAssigneeChange,
}: DashTicketProps) {
  const role = useUserStore((state) => state.role).toLowerCase(); // ✅ 전역 상태에서 role 가져오기
  const [selectedAssignee, setSelectedAssignee] = useState(managerName ?? 'all');

  const handleAssigneeSelect = (selectedOption: string) => {
    setSelectedAssignee(selectedOption);
    if (onAssigneeChange) {
      onAssigneeChange(selectedOption);
    }
  };

  // 상태 변환 (영문 → 한글)
  const statusMapping: Record<string, string> = {
    PENDING: '대기중',
    IN_PROGRESS: '진행중',
    REVIEWING: '검토 요청',
    COMPLETED: '완료',
    REJECTED: '반려',
  };

  // 긴급 티켓 스타일
  const ticketClass = urgent ? 'border-error bg-white hover:bg-red/5' : 'border-gray-2 bg-white hover:bg-gray-1';

  return (
    <div
      className={`flex gap-4 py-3 px-2 border items-center rounded cursor-pointer transition-all duration-200 ${ticketClass}`}
    >
    
      {/* 티켓 ID */}
      <Link to={detailLink} className="w-[6%] text-subtitle-regular text-gray-700 px-2">#{ticketId}</Link>
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
      <Link to={detailLink} className="w-[12%] text-body-regular text-gray-15">{deadline}</Link>
      
      {/* 담당자 */}
      <div className="w-[10%]">
        <TicketDropdown
          label={selectedAssignee}
          options={['곽서연', '김규리', '김낙도']} // 실제 담당자 리스트 필요
          defaultSelected={selectedAssignee}
          onSelect={handleAssigneeSelect}
          paddingX="px-3"
          border={true}
          textColor="text-gray-15"
        />
      </div>
      <div className="w-[15%] flex gap-2">
        <div className="px-6 h-[30px] text-[12px] leading-none border border-gray-6 rounded-md bg-gray-1 flex items-center justify-center">
          {statusMapping[status] || '상태 없음'}
        </div>
      </div>
    </div>
  );
}
