import TodayTicketStats from "./TodayTicketStats";
import AgentTicketStats from "./AgentTicketStats";
import CategoryTicketStats from "./CategoryTicketStats";

export default function AdminDailyStats() {
  return (
    <div className="max-w-[1200px] mt-4 bg-gray-18 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] p-4 ">
      {/* 금일 티켓 처리 현황 */}
      <div className="flex gap-4">
        <div className="w-[50%] bg-white p-4 shadow-md rounded-lg">
          <TodayTicketStats />
        </div>

        <div className="w-[50%] bg-white p-4 shadow-md rounded-lg">
          <AgentTicketStats />
        </div>
      </div>

      {/* 카테고리별 티켓 생성 현황 */}
      <div className="bg-white p-4 shadow-md rounded-lg mt-6">
        <CategoryTicketStats />
      </div>
    </div>
  );
}
