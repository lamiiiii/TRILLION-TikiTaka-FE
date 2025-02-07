import {useEffect, useState} from 'react';
import {useUserStore} from '../../store/store';
import {getUserInfo} from '../../api/service/users';

export default function UserBox() {
  const {userId, setUserId, role, setRole, setUserName} = useUserStore();
  const [userInfo, setUserInfo] = useState<UserDetailResponse | null>(null);

  const getRoleColor = () => {
    switch (role) {
      case 'MANAGER':
        return '#2C2C2C';
      case 'USER':
        return '#F6D47A';
      case 'ADMIN':
        return '#16407B';
      default:
        return '#FFFFFF';
    }
  };

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

  // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!event.target.files || event.target.files.length === 0) return;

  //   const file = event.target.files[0];

  //   try {
  //     // 1️⃣ 파일 업로드 API 호출
  //     const uploadResponse = await uploadFile(file, userId);
  //     if (!uploadResponse?.fileUrl) throw new Error('File upload failed');

  //     // 2️⃣ 업로드된 URL을 프로필 이미지로 저장
  //     await updateUserProfile(userId, uploadResponse.fileUrl);

  //     // 3️⃣ UI 업데이트
  //     setUserInfo((prev) => prev && { ...prev, profileImageUrl: uploadResponse.fileUrl });
  //   } catch (error) {
  //     console.error('이미지 업로드 실패:', error);
  //   }
  // };

  if (!userInfo) {
    return <div>No user</div>; // 임시
  }
  return (
    <div className="flex flex-col w-full h-32 border-b border-gray-2 p-2 pb-4 justify-center gap-1">
      <div className="w-12 h-12 rounded-full my-2">
        {userInfo.profileImageUrl ? (
          <img src={userInfo.profileImageUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
        ) : (
          <div className="w-full h-full rounded-full" style={{backgroundColor: getRoleColor()}}></div>
        )}
      </div>
      <div className="text-main text-subtitle">{userInfo.username}</div>
      <div className="text-gray-6 text-xs">{userInfo.email}</div>
    </div>
  );
}
