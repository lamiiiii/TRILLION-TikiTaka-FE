import {useState} from 'react';
interface ProfileInitialProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  backgroundColor: 'MANAGER' | 'USER' | 'ADMIN';
}

const sizeClasses = {
  sm: 'w-5 h-5 text-xs',
  md: 'w-6 h-6 text-sm',
  lg: 'w-8 h-8 text-base',
};

const colorClasses = {
  MANAGER: 'bg-gray-7',
  USER: 'bg-main2-1',
  ADMIN: 'bg-admin-2',
};

export default function Profile({name, size = 'sm', backgroundColor}: ProfileInitialProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const initial = name?.charAt(0).toUpperCase();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="relative">
      {/* {isPopupOpen && (
        <div className="absolute right-full mr-3">
          <ProfilePopup />
        </div>
      )} */}
      <div
        className={`${sizeClasses[size]} ${colorClasses[backgroundColor]} ${backgroundColor} text-white text-base p-3 rounded-full flex items-center justify-center font-bold cursor-pointer`}
        onClick={togglePopup}
      >
        {initial}
      </div>
    </div>
  );
}
