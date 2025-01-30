import {Link} from 'react-router-dom';
import {LinkIcon} from './Icon';
import {TopMenuProps} from '../../interfaces/interfaces';

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
      <div className="flex justify-between w-full h-8 px-4 py-1 text-base">
        {/* 메뉴 좌측 요소 */}
        <div className="flex gap-4 text-gray-12">
          {/* 볼드 폰트 요소 */}
          <p className="text-black font-bold">{boldBlackText}</p>
          <p className="font-bold">{boldGrayText}</p>
          <p className="font-bold">{boldSmText}</p>

          {/* 레귤러 폰트 요소 */}
          <p className="subtitle-regular">{regularText}</p>
          {/* 버튼 */}
          {btnText && onBtnClick && (
            <button onClick={onBtnClick} className="h-full items-center px-4 bg-main font-regular text-white text-xs rounded">
              {btnText}
            </button>
          )}
        </div>

        {/* 메뉴 우측 요소 */}
        {linkTo && rightText && (
          <Link to={linkTo} className="flex items-center gap-2 font-bold text-gray-12">
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
