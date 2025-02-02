import {Link} from 'react-router-dom';
import {LinkIcon} from './Icon';
export interface TopMenuProps {
  boldBlackText?: string; // 좌측 요소 (검정색 bold)
  boldGrayText?: string; // 좌측 요소 (gray-12 bold)
  boldSmText?: string; // 좌측 요소 (gray-12 10px bold)
  regularText?: string; // 좌측 요소 (gray-12 regular)
  btnText?: string; // 좌측 요소
  onBtnClick?: () => void;
  rightText?: string;
  linkTo?: string;
}

export default function TopMenu({
  boldBlackText,
  boldGrayText,
  boldSmText,
  regularText,
  btnText,
  onBtnClick,
  rightText,
  linkTo,
}: TopMenuProps) {
  return (
    <div className="flex flex-col w-full gap-3 mt-6 whitespace-nowrap">
      <div className="flex justify-between w-full h-8 px-4 items-center ">
        {/* 메뉴 좌측 요소 */}
        <div className="flex gap-4 text-title-bold text-gray-12 items-center">
          {/* 볼드 폰트 요소 */}
          {boldBlackText && <p className="text-black">{boldBlackText}</p>}
          {boldGrayText && <p>{boldGrayText}</p>}
          {boldSmText && <p>{boldSmText}</p>}

          {/* 레귤러 폰트 요소 */}
          {regularText && <p className="text-subtitle-regular">{regularText}</p>}
          {/* 버튼 */}
          {btnText && onBtnClick && (
            <button onClick={onBtnClick} className="h-full btn">
              {btnText}
            </button>
          )}
        </div>

        {/* 메뉴 우측 요소 */}
        {linkTo && rightText && (
          <Link to={linkTo} className="flex items-center gap-2 text-title-bold text-gray-12">
            {rightText}
            <LinkIcon />
          </Link>
        )}
      </div>
      {/* 구분선 */}
      <hr className="division" />
    </div>
  );
}
