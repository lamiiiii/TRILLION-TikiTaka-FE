import {useUserStore} from '../../store/store';
import {AccountIcon, CategoryIcon, DbIcon, InquiryIcon, LgRightIcon, LogoutIcon, MyIcon, NewTicketIcon, StatIcon, TicketIcon} from './Icon';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import MenuItem from './MenuItem';
import SubMenuItem from './SubMenuItem';

export default function SideBar() {
  const location = useLocation();
  const role = useUserStore((state) => state.role);
  const navigate = useNavigate();

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

  const onClickLogout = () => {
    // 토큰 삭제
    console.log('로그아웃');
    navigate('/');
  };

  return (
    <div className="flex flex-col fixed justify-between bg-bg-1 w-52 min-h-screen z-50 top-14 left-0 px-4 py-6 pb-20">
      {/* 상단 메뉴 */}
      <div className="flex flex-col w-full h-auto gap-4 ">
        {/* 대시보드 메뉴 */}
        {role !== 'admin' && (
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
        )}

        {/* 담당자 메뉴 */}
        {role === 'manager' && (
          <>
            <MenuItem icon={StatIcon} text="통계 관리" to="/manager/statistics" />
            <MenuItem icon={TicketIcon} text="티켓 관리" to="/manager/tickets">
              <SubMenuItem to="/manager/tickets" text="티켓 관리" />
              <SubMenuItem to="/manager/histories" text="티켓 이력 관리" />
            </MenuItem>
            <MenuItem icon={NewTicketIcon} text="티켓 생성" to="/manager/newticket">
              <SubMenuItem to="/manager/newticket" text="티켓 생성" />
              <SubMenuItem to="/manager/newtickets" text="요청 티켓 관리" />
            </MenuItem>
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
            <MenuItem icon={StatIcon} text="통계 관리" to="/admin/statistics" />
            <MenuItem icon={InquiryIcon} text="문의/요청 관리" to="/admin/inquiries" />
          </>
        )}
      </div>

      {/* 하단 로그아웃 */}
      <div className="">
        <button
          onClick={onClickLogout}
          className="
          flex w-full h-12 items-center p-2 rounded-lg border border-bg-1 font-regular text-sm text-gray-8 gap-5
          gray-hover"
        >
          <LogoutIcon />
          로그아웃
        </button>
      </div>
    </div>
  );
}
