import { useState } from "react";
import TicketFilter from "../../common/ticket/TicketFilter";
import TicketList from "../../common/ticket/TicketList";
import { TicketViewType } from "../../../interfaces/ticket";

export default function ManagerHomeContainer() {
  const [selectedFilter, setSelectedFilter] = useState<TicketViewType>("전체");

  return (
    <div className="flex flex-col max-w-1200">
      {/* 필터 선택 시 상태 업데이트 */}
      <TicketFilter role="manager" onFilterChange={setSelectedFilter} /> 
      
      {/* 선택된 필터에 맞는 티켓만 표시 */}
      <TicketList role="manager" selectedFilter={selectedFilter} />
    </div>
  );
}
