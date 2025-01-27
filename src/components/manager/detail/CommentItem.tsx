import Profile from '../../common/Profile';

interface CommentItemProps {
  name: string;
  content: string;
}

export default function CommentItem({name, content}: CommentItemProps) {
  return (
    <div className="flex gap-3 mt-10">
      <Profile name="Hong" backgroundColor="user" size="sm" />
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <p className="text-gray-16 text-body-bold">{name}</p>
          <img src="/assets/kakao-work.png" alt="카카오 워크" className="w-6 h-6" />
          <div className="w-full flex justify-between text-body-regular">
            <div className="flex gap-1 text-gray-8 ">
              <button className="hover:text-gray-15">편집</button>
              <button className="hover:text-gray-15">삭제</button>
            </div>
            <p>5분 전</p>
          </div>
        </div>
        <p className="text-subtitle-regular">{content}</p>
      </div>
    </div>
  );
}
