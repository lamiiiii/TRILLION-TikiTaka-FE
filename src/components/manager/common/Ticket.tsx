import { useState } from "react";
import { TicketProps } from "../../../interfaces/ticket";
import Dropdown from "../../common/Dropdown";
import { AlertIcon } from "../../common/Icon";

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
  
}: TicketProps) {
  const [selectedAssignee, setSelectedAssignee] = useState(assignee); // 담당자 상태
  const [status, setStatus] = useState<"대기" | "진행중" | "완료" | "반려">("대기"); // ✅ 티켓 상태 관리

  const handleAssigneeSelect = (selectedOption: string) => {
    setSelectedAssignee(selectedOption);
  };

  const handleApprove = () => {
    setStatus("진행중"); // ✅ 진행 버튼 클릭 시 "진행중" 상태로 변경
  };

  const handleReject = () => {
    setStatus("반려"); // ✅ 반려 버튼 클릭 시 "반려" 상태로 변경
  };

  const handleStatusChange = (selectedStatus: string) => {
    if (selectedStatus === "완료") {
      setStatus("완료"); // ✅ 드롭다운에서 "완료" 선택 시 상태 변경
    }
  };

  // 긴급 티켓 스타일
  const ticketClass = isUrgent ? "border-error bg-white hover:bg-red/5" : "border-gray-2 bg-white hover:bg-gray-1";

  return (
    <div className={`flex gap-4 py-4 px-2 border items-center rounded cursor-pointer transition-all duration-200 ${ticketClass}`}>
      {/* 티켓 ID */}
      <div className="w-[6%] text-subtitle-regular text-gray-700 px-2">#{id}</div>

      {/* 카테고리 */}
      <div className="w-[12%] text-subtitle-regular">
        <span>{category}</span>
        <br />
        <span className="text-gray-6 text-body-regular">{subCategory}</span>
      </div>

      {/* 요청 내용 */}
      <div className="w-[36%] text-left">
        <div className="flex items-center gap-1">
          {isUrgent && <AlertIcon className="text-error w-4 h-4" />}
          <div className={`text-subtitle-regular ${isUrgent ? "text-error" : "text-gray-15"}`}>{title}</div>
        </div>
        <div className="text-gray-6 text-body-regular">
          {content.length > 40 ? `${content.slice(0, 40)}...` : content}
        </div>
      </div>

      {/* 기한 */}
      <div className="w-[12%] text-body-regular text-gray-15">{deadline}</div>

      {/* 담당자 드롭다운 */}
      <div className="w-[10%]">
        <Dropdown
          label={selectedAssignee}
          options={assigneeOptions}
          defaultSelected={selectedAssignee}
          onSelect={handleAssigneeSelect}
          paddingX="px-3"
          border={true}
          textColor="text-gray-15"
        />
      </div>

      {/* 승인 여부 (진행중, 완료, 반려) */}
      <div className="w-[15%] flex gap-2">
        {status === "대기" && (
          <>
            <button
              className="px-5 h-[30px] text-[12px] leading-none border border-gray-6 rounded-md hover:bg-gray-8 hover:text-white"
              onClick={handleApprove}
            >
              진행
            </button>
            <button
              className="px-5 h-[30px] text-[12px] leading-none border border-gray-6 rounded-md hover:bg-gray-8 hover:text-white"
              onClick={handleReject}
            >
              반려
            </button>
          </>
        )}
        {status === "진행중" && (
          <Dropdown
            label="진행중"
            options={["진행중", "완료"]}
            defaultSelected="진행중"
            onSelect={handleStatusChange}
            paddingX="px-5"
            border={true}
            textColor="text-gray-15"
          />
        )}
        {status === "완료" && <div className="px-8 py-1.5 text-[12px] leading-none border border-gray-4 bg-gray-1 rounded-md">완료</div>}
        {status === "반려" && <div className="px-8 py-1.5 text-[12px] leading-none border border-error bg-red/10 rounded-md">반려</div>}
      </div>
    </div>
  );
}
