import {useState} from 'react';
import ProfilePopup from './ProfilePopup';
import {useQuery} from '@tanstack/react-query';
import {getUserDetail} from '../../api/service/users';

interface ProfileInitialProps {
  userId?: number;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  backgroundColor: 'MANAGER' | 'USER' | 'ADMIN';
  isTopBar?: boolean;
}

const sizeClasses = {sm: 'w-5 h-5 text-xs', md: 'w-6 h-6 text-sm', lg: 'w-8 h-8 text-base'};

const colorClasses = {MANAGER: 'bg-gray-7', USER: 'bg-main2-1', ADMIN: 'bg-admin-2'};

export default function Profile({userId, name, size = 'sm', backgroundColor, isTopBar}: ProfileInitialProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const {data: userDetail} = useQuery({
    queryKey: ['userDetail', userId],
    queryFn: () => (userId ? getUserDetail(userId) : null),
    enabled: !!userId, // userId가 존재할 때만 쿼리 실행
  });

  return (
    <div className="relative">
      {!isTopBar && isPopupOpen && <div className="absolute right-full mr-3">{userDetail && <ProfilePopup userDetail={userDetail} />}</div>}
      <div
        className={`${sizeClasses[size]} ${colorClasses[backgroundColor]}  text-white rounded-full flex items-center justify-center  cursor-pointer overflow-hidden`}
        onClick={togglePopup}
      >
        {userDetail?.profileImageUrl ? (
          <img src={userDetail.profileImageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <img src="/assets/profile.png" alt={name} className="w-full h-full object-cover" />
        )}
      </div>
    </div>
  );
}
