import { useState } from "react";
import AdminStatFilter from "./StatFilter";
import AdminDailyStats from "./AdminDailyStats";

export default function AdminStatContainer() {
  const [selectedTab, setSelectedTab] = useState<"일간" | "월간">("일간");

  return (
    <div className="flex flex-col max-w-[1200px] ">
      {/* 필터 컴포넌트 */}
      <AdminStatFilter onFilterChange={(type) => setSelectedTab(type)} />

      {/* 선택된 탭에 따른 내용 표시 */}
      <div className="mt-6">
        {selectedTab === "일간" ? (
          <AdminDailyStats/>
        ) : (
          <div className="text-lg text-gray-700">📆 이번 달의 통계 데이터를 표시합니다.</div>
        )}
      </div>
    </div>
  );
}
