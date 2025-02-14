export interface TopMenuProps {
  boldBlackText?: string; // 좌측 요소 (검정색 bold)
  boldGrayText?: string; // 좌측 요소 (gray-12 bold)
  boldSmText?: string; // 좌측 요소 (gray-12 10px bold)
  regularText?: string; // 좌측 요소 (gray-12 regular)
  btnText?: string; // 좌측 요소
  onBtnClick?: () => void;
  rightText?: string;
}

export default function AdminTopMenu({boldBlackText, boldGrayText, boldSmText, regularText, btnText, onBtnClick}: TopMenuProps) {
  return (
    <div className="flex flex-col w-full gap-3 mt-6 whitespace-nowrap">
      <div className="flex justify-between w-full h-8 px-4 py-1 text-base">
        {/* 메뉴 좌측 요소 */}
        <div className="flex gap-3 text-gray-12">
          {/* 볼드 폰트 요소 */}
          <p className="text-black font-bold">{boldBlackText}</p>
          <p className="font-bold">{boldGrayText}</p>
          <p className="text-[12px] font-bold leading-7">{boldSmText}</p>

          {/* 레귤러 폰트 요소 */}
          <p className="subtitle-regular">{regularText}</p>
          {/* 버튼 */}
          {btnText && onBtnClick && (
            <button onClick={onBtnClick} className="h-full items-center px-4 bg-main font-regular text-white text-xs rounded">
              {btnText}
            </button>
          )}
        </div>
      </div>
      {/* 구분선 */}
      <hr className="division border-t-1 border-gray-4" />
    </div>
  );
}
