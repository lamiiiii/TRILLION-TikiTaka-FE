import { useEffect, useRef, useState } from 'react';
import { TicketViewType } from '../../../interfaces/ticket'; // 외부에서 TicketViewType 가져오기

// 상태와 티켓 개수 데이터 정의
const ticketData: { type: TicketViewType; count: number }[] = [
  { type: '전체', count: 1000 },
  { type: '대기중', count: 140 },
  { type: '진행중', count: 166 },
  { type: '완료', count: 32 },
  { type: '검토 요청', count: 53 },
  { type: '긴급', count: 10 },
];

// 개별 필터 아이템 컴포넌트
function FilterItem({
  type,
  count,
  isSelected,
  onClick,
}: {
  type: TicketViewType;
  count: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  // 텍스트 색상
  const textColor =
    type === '긴급'
      ? isSelected
        ? 'text-red text-title-bold' // 선택된 긴급 상태는 흰색 텍스트
        : 'text-red/85 text-title-bold' // 선택되지 않은 긴급 상태는 흐린 빨간색 텍스트
      : isSelected
      ? 'text-black text-title-bold' // 선택된 다른 상태는 검은색 텍스트
      : 'text-gray-6 text-title-bold'; // 선택되지 않은 다른 상태는 흐린 회색 텍스트

  // 배경색
  const bgColor =
    type === '긴급'
      ? isSelected
        ? 'bg-red' // 선택된 긴급 상태는 진한 빨간색 배경
        : 'bg-red/85' // 선택되지 않은 긴급 상태는 흐린 빨간색 배경
      : isSelected
      ? 'bg-gray-9' // 선택된 다른 상태는 진한 회색 배경
      : 'bg-gray-6'; // 선택되지 않은 다른 상태는 흐린 회색 배경

  return (
    <div
      className={`flex items-center gap-2 cursor-pointer`}
      onClick={onClick}
    >
      {/* 텍스트 */}
      <span className={textColor}>{type}</span>
      {/* Count */}
      <div className={`px-4 h-[16px] flex place-items-center rounded-full  ${bgColor} text-white mb-0.5`}>
        <div className="mt-0.5 text-caption-bold">{count}</div>
      </div>
    </div>
  );
}

// 전체 필터 컴포넌트
export default function TicketFilter() {
  const [selectedType, setSelectedType] = useState<TicketViewType>('전체');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll<HTMLDivElement>('.filter-item');
      const selectedIndex = ticketData.findIndex((item) => item.type === selectedType);
      if (items[selectedIndex]) {
        const selectedItem = items[selectedIndex];
        setIndicatorStyle({
          left: selectedItem.offsetLeft,
          width: selectedItem.clientWidth,
        });
      }
    }
  }, [selectedType]);

  return (
    <div className="w-full mt-10 relative">
      {/* 필터 리스트 */}
      <div className="flex w-full h-6 px-4 gap-6" ref={containerRef}>
        {ticketData.map((item) => (
          <div
            key={item.type}
            className="filter-item"
          >
            <FilterItem
              type={item.type}
              count={item.count}
              isSelected={item.type === selectedType}
              onClick={() => setSelectedType(item.type)}
            />
          </div>
        ))}
      </div>
      {/* 이동하는 하단 Border */}
      <div
        className="absolute bottom-0 h-0.5 bg-gray-7 transition-all duration-300"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
      />
    </div>
  );
}
