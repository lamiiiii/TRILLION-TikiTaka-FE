import {useState} from 'react';
import {createInquiry} from '../../../api/service/inquiry'; // API 호출 함수
import DropDown from '../../common/Dropdown';
import Input from '../../common/Input';
import {XIcon} from '../../common/Icon';
import Portal from '../../common/Portal';
import {AnimatePresence, motion} from 'framer-motion';
import DOMPurify from 'dompurify';

interface InquiryModalProps {
  onClose: () => void;
  onInquirySubmit: () => void; // 🚀 문의 등록 후 목록 갱신을 위한 콜백
}

export default function InquiryModal({onClose, onInquirySubmit}: InquiryModalProps) {
  const [type, setType] = useState<'QUESTION' | 'REQUEST'>('QUESTION');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTypeSelect = (selectedOption: string) => {
    setType(selectedOption === '질문' ? 'QUESTION' : 'REQUEST');
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      await createInquiry({title, content, type});
      alert('문의가 등록되었습니다!');
      onInquirySubmit(); // 🚀 문의사항 목록 새로고침
      onClose(); // 모달 닫기
    } catch (error) {
      alert('문의 등록에 실패했습니다.');
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        <motion.div className="overlay" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
          <motion.div
            className="flex flex-col w-[460px] bg-white border border-gray-2 rounded px-5 py-5"
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{type: 'spring', damping: 25, stiffness: 500}}
          >
            <div className="flex items-start justify-between">
              <h1 className="text-title-bold">문의하기</h1>
              <button onClick={onClose}>
                <XIcon />
              </button>
            </div>

            <hr className="division my-[10px]" />

            <div className="w-full flex flex-col gap-[10px]">
              <DropDown label="유형" value={type === 'QUESTION' ? '질문' : '요청'} options={['질문', '요청']} onSelect={handleTypeSelect} />
              <Input
                label="제목"
                element="input"
                size="sm"
                placeholder="제목을 입력해주세요."
                value={title}
                onChange={(e) => setTitle(DOMPurify.sanitize(e.target.value))}
              />
              <Input
                label="문의 내용"
                element="textarea"
                size="sm"
                placeholder="문의 내용을 입력해주세요."
                value={content}
                onChange={(e) => setContent(DOMPurify.sanitize(e.target.value))}
              />
            </div>

            <button className="w-fit main-btn mt-3" onClick={handleSubmit}>
              문의 등록
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Portal>
  );
}
