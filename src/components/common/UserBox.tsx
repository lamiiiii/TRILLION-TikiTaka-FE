import {useEffect, useRef, useState} from 'react';
import {useUserStore} from '../../store/store';
import {getUserInfo, patchUserProfileImage} from '../../api/service/users';
import {CameraIcon} from './Icon';

export default function UserBox() {
  const {userId, setUserId, setRole, setUserName} = useUserStore();
  const [userInfo, setUserInfo] = useState<UserDetailResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserId(data.userId);
        setRole(data.role);
        setUserName(data?.username);
        setUserInfo(data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };
    fetchUserInfo();
  }, [userId]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    try {
      const uploadResponse = await patchUserProfileImage(userId, file);
      if (!uploadResponse) throw new Error('File upload failed');

      setUserInfo((prev) => prev && {...prev, profileImageUrl: uploadResponse.fileUrl});
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  if (!userInfo) return;

  return (
    <div className="flex flex-col w-full h-32 border-b border-gray-2 p-2 pb-4 justify-center gap-1">
      <div className="relative w-12 h-12 rounded-full my-2">
        {userInfo.profileImageUrl ? (
          <img src={userInfo.profileImageUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
        ) : (
          <img src="/assets/profile.png" alt="Profile" className="w-full h-full rounded-full" />
        )}
        <div className="absolute bottom-0 right-0 cursor-pointer" onClick={handleCameraClick}>
          <CameraIcon />
        </div>
      </div>
      <div className="text-main text-subtitle">{userInfo.username}</div>
      <div className="text-gray-6 text-xs">{userInfo.email}</div>
      <input ref={fileInputRef} type="file" accept="image/png, image/jpeg" style={{display: 'none'}} onChange={handleImageUpload} />
    </div>
  );
}
