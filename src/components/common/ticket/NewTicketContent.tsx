import {useEffect, useRef, useState} from 'react';
import {useNewTicketFormStore, useNewTicketStore} from '../../../store/store';
import {RequiredIcon} from '../Icon';
import MarkdownPreview from '../MarkdownPreview';
import {getTicketForm} from '../../../api/service/tickets';
import Modal from '../Modal';

export default function NewTicketContent() {
  const {title, content, firstCategory, secondCategory, setTitle, setContent} = useNewTicketStore();
  const {description, setDescription, setMustDescription} = useNewTicketFormStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  useEffect(() => {
    const fetchRequestForm = async () => {
      if (firstCategory?.id && secondCategory?.id) {
        try {
          const formData = await getTicketForm(firstCategory.id, secondCategory.id);
          setMustDescription(formData.mustDescription);
          setDescription(formData.description);
          setIsModalOpen(true);
        } catch (error) {
          console.error('티켓 폼 조회 실패:', error);
        }
      }
    };

    fetchRequestForm();
  }, [firstCategory?.id, secondCategory?.id, setMustDescription]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onOverwrite = () => {
    if (description) {
      setContent('');
      setContent(description);
    }
    setIsModalOpen(false);
  };

  const onCancel = () => {
    setIsModalOpen(false);
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

      {isModalOpen && (
        <Modal
          title="요청 양식 제공"
          content={
            description
              ? `2차 카테고리에 따른 요청 양식이 적용됩니다. \n 기존 내용에 덮어쓰시겠습니까?`
              : `요청 양식이 없습니다. \n 자유롭게 작성해주세요.`
          }
          backBtn={description ? '취소' : undefined} // description이 없으면 취소 버튼 없음
          onBackBtnClick={onCancel}
          checkBtn={description ? '확인' : ''}
          onBtnClick={onOverwrite}
        />
      )}
    </>
  );
}
