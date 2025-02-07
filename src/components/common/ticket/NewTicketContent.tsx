import {useEffect, useRef} from 'react';
import {useNewTicketFormStore, useNewTicketStore} from '../../../store/store';
import {RequiredIcon} from '../Icon';
import MarkdownPreview from '../MarkdownPreview';
import {getTicketForm} from '../../../api/service/tickets';

export default function NewTicketContent() {
  const {title, content, firstCategory, secondCategory, setTitle, setContent} = useNewTicketStore();
  const {setDescription, setMustDescription} = useNewTicketFormStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 텍스트가 변경될 때마다 텍스트 영역 크기 조정
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 우선 높이를 auto로 설정해줌
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 콘텐츠에 맞게 높이 조정
    }
  }, [content]);

  useEffect(() => {
    const fetchRequestForm = async () => {
      if (firstCategory?.id && secondCategory?.id) {
        try {
          const formData = await getTicketForm(firstCategory.id, secondCategory.id);
          setMustDescription(formData.mustDescription);
          setDescription(formData.description);
        } catch (error) {
          console.error('티켓 폼 조회 실패:', error);
        }
      }
    };

    fetchRequestForm();
  }, [firstCategory?.id, secondCategory?.id, setMustDescription]); // 의존성 배열 추가

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value); // 엔터 키로 줄바꿈이 가능하도록 setContent로 상태 변경
  };

  return (
    <>
      <div className="flex gap-10 items-center">
        <div className="flex items-center gap-1">
          요청 제목 <RequiredIcon />
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[660px] text-subtitle-regular border border-gray-2 bg-white py-2 px-4"
          placeholder="요청 사항에 대한 제목을 입력해주세요"
        />
      </div>

      <div className="flex gap-10 items-center">
        <div className="flex items-center gap-1">
          요청 내용 <RequiredIcon />
        </div>
        <textarea
          rows={5}
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          className="w-[800px] min-h-48 text-subtitle-regular border border-gray-2 bg-white py-2 px-4 resize-none"
          placeholder="요청 내용을 입력해주세요"
        />
      </div>

      {/* 마크다운 미리보기 */}
      <div className="w-[800px] ml-[97px] mt-4 p-4 border border-gray-3 bg-gray-1">
        {content ? <MarkdownPreview content={content} /> : <div className="text-center text-gray-6">요청 내용 미리보기 화면</div>}{' '}
      </div>
    </>
  );
}
