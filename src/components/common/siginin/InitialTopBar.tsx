import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {LogoIcon} from '../Icon';

export default function InitialTopBar() {
  const location = useLocation();

  return (
    <div className="bg-main fixed w-full h-14 z-50">
      {/* 상단바 */}
      <div className="relative w-full h-14 shrink-0 flex justify-between px-16 py-4">
        {/* 좌측 로고 */}
        <Link to="/" className="flex gap-2 items-center ">
          <LogoIcon />
          <h1 className="text-white font-bold text-base whitespace-nowrap">TIKITAKA</h1>
          <p className="text-white font-regular text-xs whitespace-nowrap">Ticket Management System</p>
        </Link>
        {/* 우측 메뉴 */}
        {location.pathname !== '/changepwd' && (
          <div className="flex items-center gap-3 text-white font-bold text-[13px]">
            {['/signup', '/signin', '/resetpwd']
              .filter((path) => path !== location.pathname) // 현재 경로 제외
              .map((path, index, array) => (
                <React.Fragment key={path}>
                  <Link to={path} className="hover:text-gray-2">
                    {path === '/signup' ? '회원가입' : path === '/signin' ? '로그인' : '비밀번호 재설정'}
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
