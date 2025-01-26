import DropDown from '../common/DropDown';
import Ticket from '../common/Ticket';

const dropdownData: {label: string; options: string[]}[] = [
  {label: '담당자', options: ['곽서연', '김규리', '김낙도']},
  {label: '1차 카테고리', options: ['카테고리1', '카테고리2', '카테고리3']},
  {label: '2차 카테고리', options: ['서브1', '서브2', '서브3']},
  {label: '요청', options: ['요청1', '요청2', '요청3', '요청4', '요청5', '요청6']},
];

const ticketData = [
    {
      id: "112",
      category: "Container Pack",
      subCategory: "Kubernetes Engine",
      content: "[요청] 마이크로서비스 기반의 애플리케이션 컨테이너화",
      deadline: "2025-02-05 15:00",
      assignee: "yeon",
      assigneeOptions: ["alex", "jojo", "hohoho"],
    },
  ];

export default function TicketList() {
  const handleSelect = (label: string, value: string) => {
    console.log(`${label}에서 ${value} 선택`);
  };
  const handleAssigneeChange = (id: string, newAssignee: string) => {
    console.log(`티켓 ${id}의 담당자가 ${newAssignee}(으)로 변경되었습니다.`);
  };

  const handleApprove = (id: string) => {
    console.log(`티켓 ${id} 승인`);
  };

  const handleReject = (id: string) => {
    console.log(`티켓 ${id} 반려`);
  };

  return (
    <div className="w-full mt-[20px] px-4 relative h-[600px] mb-[100px]">
      <div className="bg-gray-18 h-full shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] flex flex-col justify-start p-4">
        {/* 드롭다운 필터 리스트 */}
        <div className="flex items-center gap-4 leading-none mt-4 px-2">
          {dropdownData.map((data) => (
            <DropDown key={data.label} label={data.label} options={data.options} onSelect={(value) => handleSelect(data.label, value)} />
          ))}
          <div className="ml-auto text-gray-700 text-subtitle ">
            조회 건수 <span className="text-black text-title-bold ml-1">200건</span>
          </div>
        </div>
        {/* 테이블 헤더 */}
        <div className="flex gap-4 py-2  text-gray-700 text-title-regular mt-5 mb-5 px-2">
          <div className=" w-[6%]">티켓 ID</div>
          <div className=" w-[12%]">카테고리</div>
          <div className=" w-[36%]">요청 내용</div>
          <div className=" w-[12%]">기한</div>
          <div className=" w-[10%]">담당자</div>
          <div className=" w-[15%]">승인 여부</div>
        </div>
        <div>
      {ticketData.map((ticket) => (
        <Ticket
          key={ticket.id}
          id={ticket.id}
          category={ticket.category}
          subCategory={ticket.subCategory}
          content={ticket.content}
          deadline={ticket.deadline}
          assignee={ticket.assignee}
          assigneeOptions={ticket.assigneeOptions}
          onAssigneeChange={(newAssignee) =>
            handleAssigneeChange(ticket.id, newAssignee)
          }
          onApprove={() => handleApprove(ticket.id)}
          onReject={() => handleReject(ticket.id)}
        />
      ))}
    </div>
      </div>
    </div>
  );
}
