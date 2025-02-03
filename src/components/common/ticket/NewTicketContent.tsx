import {useNewTicketStore} from '../../../store/store';

export default function NewTicketContent() {
  const {title, content, setTitle, setContent} = useNewTicketStore();
  return (
    <>
      <div className="flex gap-10 items-center">
        <p>요청 제목</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[660px] text-subtitle-regular border border-gray-2 bg-white py-2 px-4"
          placeholder="요청 사항에 대한 제목을 입력해주세요"
        />
      </div>
      <div className="flex gap-10 items-center">
        {/* todo 에디터 추가 */}
        <p>요청 내용</p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-[660px] min-h-48 text-subtitle-regular border border-gray-2 bg-white py-2 px-4 resize-none"
          placeholder="요청 내용을 입력해주세요"
        />
      </div>
    </>
  );
}
