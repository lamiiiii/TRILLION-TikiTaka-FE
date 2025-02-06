export default function ProfilePopup() {
  return (
    <div className="z-200 w-min bg-white flex flex-col items-center gap-0.5 p-2 border border-gray-2 rounded-md">
      <img src="/assets/profile.png" alt="프로필 사진" />
      <p className="text-body-regular mt-2">Yeonii@naver.com</p>
      <a href="https://www.kakaowork.com/" className="text-caption-regular">
        https://www.kakaowork.com/
      </a>
    </div>
  );
}
