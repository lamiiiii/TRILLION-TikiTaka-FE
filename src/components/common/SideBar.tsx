import {useUserStore} from '../../store/store';
import {
  AccountIcon,
  CategoryIcon,
  DbIcon,
  InquiryIcon,
  LgRightIcon,
  LogoutIcon,
  MyIcon,
  NewTicketIcon,
  StatIcon,
  TicketIcon,
  XsLeftIcon,
} from './Icon';
import {Link, useLocation} from 'react-router-dom';
import MenuItem from './MenuItem';
import SubMenuItem from './SubMenuItem';
import {useState} from 'react';

export default function SideBar() {
  const location = useLocation();
  const role = useUserStore((state) => state.role);

  const [isVisible, setIsVisible] = useState(true);

  const getDashboardLink = () => {
    switch (role) {
      case 'manager':
        return '/manager';
      case 'user':
        return '/user';
      case 'admin':
        return '/admin';
      default:
        return '/';
    }
  };

  return (
    <div className="flex">
      <div
        className={`flex flex-col fixed justify-between bg-bg-1 w-52 min-h-screen z-50 top-14 left-0 px-4 py-6 pb-20
      transition-all duration-300 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* 상단 메뉴 */}
        <div className="flex flex-col w-full h-auto gap-4 ">
          {/* 대시보드 메뉴 */}
          <Link
            to={getDashboardLink()}
            className={`side-menu rounded-lg border border-gray-18 mb-4 text-subtitle ${
              location.pathname === '/manager' || location.pathname === '/user' || location.pathname === '/admin'
                ? 'active-menu text-gray-15'
                : 'gray-hover text-gray-8'
            }`}
          >
            <div className="flex items-center gap-4">
              <DbIcon strokeColor={location.pathname === '/manager' || location.pathname === '/user' ? '#1A1B1F' : '#565965'} /> Dashboard
            </div>
            <LgRightIcon strokeColor={location.pathname === '/manager' || location.pathname === '/user' ? '#1A1B1F' : '#A3A8BF'} />
          </Link>

          {/* 담당자 메뉴 */}
          {role === 'manager' && (
            <>
              <MenuItem icon={StatIcon} text="통계 관리" to="/manager/statistics" />
              <MenuItem icon={TicketIcon} text="티켓 관리" to="/manager/tickets" />
              <MenuItem icon={MyIcon} text="마이페이지" to="/manager/inquiry">
                <SubMenuItem to="/manager/inquiry" text="문의내역 확인" />
                <SubMenuItem to="/manager/pwdChange" text="비밀번호 변경" />
              </MenuItem>
            </>
          )}

          {/* 사용자 메뉴 */}
          {role === 'user' && (
            <>
              <MenuItem icon={NewTicketIcon} text="티켓 생성" to="/user/newticket" />
              <MenuItem icon={MyIcon} text="마이페이지" to="/user/inquiry">
                <SubMenuItem to="/user/inquiry" text="문의내역 확인" />
                <SubMenuItem to="/user/pwdChange" text="비밀번호 변경" />
              </MenuItem>
            </>
          )}

          {/* 관리자 메뉴 */}
          {role === 'admin' && (
            <>
              <MenuItem icon={AccountIcon} text="계정 관리" to="/admin/accounts" />
              <MenuItem icon={CategoryIcon} text="카테고리 관리" to="/admin/categories" />
              <MenuItem icon={InquiryIcon} text="문의/요청 관리" to="/admin/inquiries" />
            </>
          )}
        </div>

        {/* 하단 로그아웃 */}
        <div className="">
          <button
            onClick={() => {
              //todo 로그아웃 처리 로직 (store 상태 초기화, 로그아웃 API 호출 등)
              console.log('로그아웃');
            }}
            className="
          flex w-full h-12 items-center p-2 rounded-lg border border-bg-1 font-regular text-sm text-gray-8 gap-5
          gray-hover"
          >
            <LogoutIcon />
            로그아웃
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsVisible((prev) => !prev)}
        className="fixed top-20 z-50 p-1 bg-main rounded-full transition-transform duration-300"
        style={{
          transform: isVisible ? 'rotate(0deg)' : 'rotate(180deg)',
          left: isVisible ? '208px' : '20px',
        }}
      >
        <XsLeftIcon />
      </button>
    </div>
  );
}
