import {useState} from 'react';
import {useTokenStore, useUserStore} from '../../store/store';
import {DownIcon, LogoIcon, SmProfileIcon} from './Icon';
import {Link, useNavigate} from 'react-router-dom';
import {postLogout} from '../../api/service/auth';
import {useOutsideClick} from '../../hooks/useOutsideClick';

export default function TopBar() {
  const {role, userName} = useUserStore();
  const {logout} = useTokenStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const roleLabel =
    {
      manager: 'MANAGER',
      admin: 'ADMIN',
      user: 'USER',
    }[role?.toLowerCase()] || '';

  const onClickLogout = () => {
    try {
      postLogout();
      logout(); // 상태 저장
      navigate('/');
      window.location.reload(); // 로그아웃 후 새로고침
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const dropdownRef = useOutsideClick(() => setIsDropdownOpen(false));

  return (
    <div className="bg-main fixed w-full h-14 z-50">
      {/* 상단바 */}
      <div className="relative w-full h-14 shrink-0 flex justify-between pl-12 pr-24 py-4">
        {/* 좌측 로고 */}
        <Link to={`/${role.toLowerCase()}`} className="flex items-center gap-2">
          <LogoIcon />
          <div className="flex gap-3 items-baseline">
            <div className="flex items-center text-white font-bold text-lg ">TIKITAKA</div>
            <div className="font-bold text-xs text-gray-2">{roleLabel}</div>
          </div>
        </Link>

        {/* 우측 메뉴 */}
        <div className="flex items-center gap-4">
          {/* <PushIcon /> */}
          <div className="flex items-center gap-2 text-white cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div className="relative">
              <SmProfileIcon />
              <div className="absolute top-[13px] left-[13px] text-white font-bold text-xs" style={{transform: 'translate(-50%, -50%)'}}>
                {userName?.[0]}
              </div>
            </div>
            <DownIcon />
            {isDropdownOpen && (
              <div ref={dropdownRef} className="absolute top-10 mt-4 bg-white border border-gray-3 rounded-md shadow-lg z-10 ">
                <ul>
                  {role !== 'ADMIN' && (
                    <li
                      className="px-2 py-1.5 text-center cursor-pointer leading-none m-2 text-black text-caption-regular hover:bg-gray-1 hover:font-bold rounded-md"
                      onClick={() => navigate(`/${role?.toLowerCase()}/pwdChange`)}
                    >
                      비밀번호 변경
                    </li>
                  )}
                  <li
                    className="px-2 py-1.5 text-center cursor-pointer leading-none m-2 text-black text-caption-regular hover:bg-gray-1 hover:font-bold rounded-md"
                    onClick={onClickLogout}
                  >
                    로그아웃
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
