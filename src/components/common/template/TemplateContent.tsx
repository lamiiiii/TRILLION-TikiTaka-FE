import {useEffect, useRef} from 'react';
import {useTemplateStore} from '../../../store/store';
import {RequiredIcon} from '../Icon';
// import Modal from '../Modal';

export default function TemplateContent() {
  const {title, content, setTitle, setContent} = useTemplateStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <>
      <div className="flex gap-[63px] items-center px-3 whitespace-nowrap">
        <div className="flex items-center gap-1 text-body-bold">
          요청 제목 <RequiredIcon />
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-[400px] max-w-[600px] text-subtitle-regular border bg-white py-2 px-4  ${title ? 'border-gray-2' : 'border-blue'}`}
          placeholder="요청 사항에 대한 제목을 입력해주세요"
        />
      </div>

      <div className="flex gap-[63px] items-center px-3 whitespace-nowrap">
        <div className="flex items-center gap-1 text-body-bold">
          요청 내용 <RequiredIcon />
        </div>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          className={`w-[400px] max-w-[700px] min-h-[300px] max-h-[300px] text-subtitle-regular border bg-white py-2 px-4 resize-none ${content ? 'border-gray-2' : 'border-blue'}`}
          placeholder={`요청 내용을 자세히 입력해주세요. \nMarkdown 문법을 지원합니다. \n 예: # 제목, **강조**, - 리스트, [링크](https://example.com)**`}
        />
      </div>
    </>
  );
}
