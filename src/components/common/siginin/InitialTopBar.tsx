import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {LogoIcon} from '../Icon';

export default function InitialTopBar() {
  const location = useLocation();

  return (
    <div className="bg-main fixed w-full h-14 z-50">
      {/* 상단바 */}
      <div className="relative w-full h-14 shrink-0 flex justify-between px-12 py-4">
        {/* 좌측 로고 */}
        <div className="flex items-center gap-2">
          <Link to="/">
            <LogoIcon />
          </Link>
          <div className="flex gap-3 items-baseline">
            <p className="text-white font-bold text-xl whitespace-nowrap">TIKITAKA</p>
            <p className="text-white font-regular text-xs whitespace-nowrap">INFRA ENGINEERING &nbsp; Ticket Management System</p>
          </div>
        </div>
        {/* 우측 메뉴 */}
        {location.pathname !== '/changepwd' && (
          <div className="flex items-center gap-3 text-white font-bold text-[13px]">
            {['/signup', '/', '/resetpwd']
              .filter((path) => path !== location.pathname) // 현재 경로 제외
              .map((path, index, array) => (
                <React.Fragment key={path}>
                  <Link to={path} className="hover:text-gray-2">
                    {path === '/signup' ? '계정 등록 신청' : path === '/' ? '로그인' : '비밀번호 재설정'}
                  </Link>
                  {index < array.length - 1 && <div className="border-r border-gray-4 h-2.5" />}
                </React.Fragment>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
