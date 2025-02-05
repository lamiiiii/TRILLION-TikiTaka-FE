// import {Link} from 'react-router-dom';

import {DownIcon, SmProfileIcon} from './Icon';

export default function TopBar() {
  return (
    <div className="bg-main fixed w-full h-14 z-50">
      {/* 상단바 */}
      <div className="relative w-full h-14 shrink-0 flex justify-between pl-16 pr-24 py-4">
        {/* 좌측 로고 */}
        <div className="flex items-center text-white font-bold text-lg ">TIKITAKA</div>
        {/* 우측 메뉴 */}
        <div className="flex items-center gap-4">
          {/* <PushIcon /> */}
          <div className="flex items-center gap-2">
            {/* todo 추후 아이디 텍스트 추가*/}
            <SmProfileIcon />
            <DownIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
