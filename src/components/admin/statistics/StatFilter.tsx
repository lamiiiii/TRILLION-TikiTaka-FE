import { useEffect, useRef, useState } from "react";

// 필터 타입
type StatViewType = "일간" | "월간";

// 필터 데이터
const statFilters: { type: StatViewType }[] = [
  { type: "일간" },
  { type: "월간" },
];

export default function AdminStatFilter({ onFilterChange }: { onFilterChange: (type: StatViewType) => void }) {
  const [selectedFilter, setSelectedFilter] = useState<StatViewType>("일간");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll<HTMLDivElement>(".filter-item");
      const selectedIndex = statFilters.findIndex((item) => item.type === selectedFilter);
      if (items[selectedIndex]) {
        const selectedItem = items[selectedIndex];
        setIndicatorStyle({
          left: selectedItem.offsetLeft,
          width: selectedItem.clientWidth,
        });
      }
    }
  }, [selectedFilter]);

  return (
    <div className="w-full mt-6 relative">
      {/* 필터 리스트 */}
      <div className="flex w-full h-7 px-4 gap-6" ref={containerRef}>
        {statFilters.map((item) => (
          <div
            key={item.type}
            className="filter-item cursor-pointer text-title-bold"
            onClick={() => {
              setSelectedFilter(item.type);
              onFilterChange(item.type);
            }}
          >
            <span className={selectedFilter === item.type ? "text-main" : "text-gray-6"}>{item.type}</span>
          </div>
        ))}
      </div>

      {/* 하단 이동 Bar */}
      <div
        className="absolute bottom-0 h-0.5 bg-main transition-all duration-300"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
      />
    </div>
  );
}
