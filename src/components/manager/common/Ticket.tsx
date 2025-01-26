import DropDown from "./DropDown"; // 공용 DropDown 컴포넌트 가져오기

interface TicketProps {
  id: string; // 티켓 ID
  category: string; // 카테고리
  subCategory: string; // 서브 카테고리
  content: string; // 요청 내용
  deadline: string; // 기한
  assignee: string; // 담당자
  assigneeOptions: string[]; // 담당자 드롭다운 옵션
  onAssigneeChange: (value: string) => void; // 담당자 변경 핸들러
  onApprove: () => void; // 진행 버튼 클릭 핸들러
  onReject: () => void; // 반려 버튼 클릭 핸들러
}

export default function Ticket({
  id,
  category,
  subCategory,
  content,
  deadline,
  assignee,
  assigneeOptions,
  onAssigneeChange,
  onApprove,
  onReject,
}: TicketProps) {
  return (
    <div className="flex gap-4 py-4 px-2 border border-gray-2 bg-white items-center rounded hover:bg-gray-1 cursor-pointer">
      {/* 티켓 ID */}
      <div className="w-[6%] text-subtitle-regular text-gray-700 px-2">
        #{id}
      </div>

      {/* 카테고리 */}
      <div className="w-[12%]  text-subtitle-regular">
        <span>{category}</span>
        <br />
        <span className="text-gray-400 text-body-regular">{subCategory}</span>
      </div>

      {/* 요청 내용 */}
      <div className="w-[36%] text-left">
        <div className="text-subtitle-regular">{content}</div>
        <div className="text-gray-400 text-body-regular">
          컨테이너 이미지 빌드, 저장, 배포 프로세스 지원 요청합니다.
        </div>
      </div>

      {/* 기한 */}
      <div className="w-[12%]  text-body-regular text-gray-700">
        {deadline}
      </div>

      {/* 담당자 */}
      <div className="w-[10%] ">
        <DropDown
          label={assignee}
          options={assigneeOptions}
          onSelect={onAssigneeChange}
        />
      </div>

      {/* 승인 여부 */}
      <div className="w-[15%] flex gap-2">
        <button
          className="px-4 py-1.5 text-gray-15 text-subtitle-regular border border-gray-6 rounded-md hover:bg-gray-1"
          onClick={onApprove}
        >
          진행
        </button>
        <button
          className="px-4 py-1 text-gray-15 text-subtitle-regular border border-gray-6 rounded-md hover:bg-gray-1"
          onClick={onReject}
        >
          반려
        </button>
      </div>
    </div>
  );
}
