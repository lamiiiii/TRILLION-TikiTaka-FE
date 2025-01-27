interface ProfileInitialProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  backgroundColor: 'manager' | 'user' | 'admin';
}

const sizeClasses = {
  sm: 'w-5 h-5 text-xs',
  md: 'w-6 h-6 text-sm',
  lg: 'w-8 h-8 text-base',
};

const colorClasses = {
  manager: 'bg-gray-7',
  user: 'bg-main2-1',
  admin: 'bg-admin-2',
};

export default function Profile({name, size = 'sm', backgroundColor}: ProfileInitialProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[backgroundColor]} ${backgroundColor} text-white text-[16px] p-3 rounded-full flex items-center justify-center font-bold `}
    >
      {initial}
    </div>
  );
}
