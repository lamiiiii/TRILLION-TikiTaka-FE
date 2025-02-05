import Profile from '../Profile';

interface CommentItemProps {
  name: string;
  content: string;
  files?: File[];
  createdAt: string;
}

export default function CommentItem({name, content, files, createdAt}: CommentItemProps) {
  return (
    <div className="flex gap-3 mt-10">
      <Profile name="Hong" backgroundColor="user" size="sm" />
      <div className="w-full flex flex-col gap-2">
        {files?.map((file, index) => (
          <a key={index} href={URL.createObjectURL(file)} className="text-blue-500 hover:underline block">
            {file.name}
          </a>
        ))}
        <div className="flex items-center gap-3">
          <p className="text-gray-16 text-body-bold">{name}</p>
          <div className="w-full flex justify-between text-body-regular">
            <div className="flex gap-1 text-gray-8 ">
              <button className="hover:text-gray-15">편집</button>
              <button className="hover:text-gray-15">삭제</button>
            </div>
            <p>{createdAt}</p>
          </div>
        </div>
        <p className="text-subtitle-regular">{content}</p>
      </div>
    </div>
  );
}
