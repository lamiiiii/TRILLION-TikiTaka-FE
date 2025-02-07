import {useQuery} from '@tanstack/react-query';
import {getUserInfo} from '../../api/service/users';

export default function ProfilePopup() {
  const {data} = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  return (
    <div className="z-[999] w-min bg-white flex flex-col items-center gap-0.5 p-2 border border-gray-2 rounded-md">
      <img
        src={data?.profileImageUrl ? data?.profileImageUrl : '/assets/profile.png'}
        className="rounded-full w-10 h-10"
        alt="프로필 사진"
      />
      <p className="text-body-regular mt-2">{data?.username}</p>
      <p className="text-caption-regular">{data?.email}</p>
    </div>
  );
}
