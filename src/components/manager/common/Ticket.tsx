import {TicketProps} from '../../../interfaces/ticket';
import { AlertIcon } from '../../common/Icon';
import DropDown from './DropDown'; // 공용 DropDown 컴포넌트 가져오기

export default function Ticket({
  id,
  category,
  subCategory,
  title,
  content,
  deadline,
  assignee,
  assigneeOptions,
  isUrgent,
  onAssigneeChange,
  onApprove,
  onReject,
}: TicketProps) {
  const truncatedContent = content.length > 40 ? `${content.slice(0, 40)}...` : content;

  return (
    <div
      className={`flex gap-4 py-4 px-2 border items-center rounded cursor-pointer transition-all duration-200
        ${isUrgent ? 'border-error bg-white hover:bg-red/5' : 'border-gray-2 bg-white hover:bg-gray-1'}
      `}
    >
      {/* 티켓 ID */}
      <div className="w-[6%] text-subtitle-regular text-gray-700 px-2">#{id}</div>

      {/* 카테고리 */}
      <div className="w-[12%]  text-subtitle-regular pt-1">
        <span>{category}</span>
        <br />
        <span className="text-gray-6 text-body-regular">{subCategory}</span>
      </div>

      {/* 요청 내용 */}
      <div className="w-[36%] text-left pt-1">
      <div className={`flex items-center gap-2 ${isUrgent ? "text-error" : "text-gray-15"} text-subtitle-regular`}>
          {isUrgent && <AlertIcon  />}
          {title}
        </div>
        <div className="text-gray-6 text-body-regular">{truncatedContent}</div>
      </div>

      {/* 기한 */}
      <div className="w-[12%]  text-body-regular text-gray-15">{deadline}</div>

      {/* 담당자 */}
      <div className="w-[10%] ">
        <DropDown label={assignee} options={assigneeOptions} onSelect={onAssigneeChange} paddingX="px-6" />
      </div>

      {/* 승인 여부 */}
      <div className="w-[15%] flex gap-2">
        <button
          className="px-5 py-1  text-subtitle-regular border border-gray-6 rounded-md hover:bg-gray-8 hover:text-white"
          onClick={onApprove}
        >
          <div className="pt-1">진행</div>
        </button>
        <button
          className="px-5 py-1  text-subtitle-regular border border-gray-6 rounded-md hover:bg-gray-8 hover:text-white"
          onClick={onReject}
        >
          <div className="pt-1">반려</div>
        </button>
      </div>
    </div>
  );
}
