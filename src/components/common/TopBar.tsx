// import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useTokenStore, useUserStore} from '../../store/store';
import {DownIcon, LogoIcon, SmProfileIcon} from './Icon';
import DropDown from './Dropdown';
import {postLogout} from '../../api/service/auth';
import {useNavigate} from 'react-router-dom';

export default function TopBar() {
  const {role} = useUserStore();
  const {logout} = useTokenStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const roleLabel =
    {
      manager: 'MANAGER',
      admin: 'ADMIN',
      user: 'USER',
    }[role?.toLowerCase()] || 'GUEST';

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

  return (
    <div className="bg-main fixed w-full h-14 z-50">
      {/* 상단바 */}
      <div className="relative w-full h-14 shrink-0 flex justify-between pl-12 pr-24 py-4">
        {/* 좌측 로고 */}
        <div className="flex items-center gap-2">
          <LogoIcon />
          <div className="flex gap-3 items-baseline">
            <div className="flex items-center text-white font-bold text-lg ">TIKITAKA</div>
            <div className="font-bold text-xs text-gray-2">{roleLabel}</div>
          </div>
        </div>

        {/* 우측 메뉴 */}
        <div className="flex items-center gap-4">
          {/* <PushIcon /> */}
          <div className="flex items-center gap-2 text-white cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <SmProfileIcon />
            <DownIcon />
          </div>
          {isDropdownOpen && (
            <div className="absolute top-10 right-0">
              <DropDown
                label="메뉴"
                options={['로그아웃']}
                onSelect={onClickLogout}
                paddingX="px-6"
                border={false}
                textColor="text-gray-900"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
