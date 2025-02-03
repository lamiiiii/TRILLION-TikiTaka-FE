import {useState} from 'react';
import DropDown from '../../common/Dropdown';
import Input from '../../common/Input';
import {XIcon} from '../../common/Icon';
import Portal from '../../common/Portal';
import {AnimatePresence, motion} from 'framer-motion';

interface InquiryModalProps {
  onClose: () => void;
}

export default function InquiryModal({onClose}: InquiryModalProps) {
  const [type, setType] = useState('요청');
  const handleTypeSelect = (selectedOption: string) => {
    setType(selectedOption);
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
              <div className="flex flex-col">
                <h1 className="text-title-bold">문의하기</h1>
                <p className="text-body-regular text-main mt-1">관리자에게 문의할 내용을 작성해주세요</p>
              </div>
              <button onClick={onClose}>
                <XIcon />
              </button>
            </div>

            <hr className="division my-[10px]" />

            <div className="w-full flex flex-col gap-[10px]">
              <div className="flex items-center">
                <label className="text-subtitle mr-6 w-[80px]">유형</label>
                <DropDown label="유형" value={type} options={['요청', '질문']} onSelect={handleTypeSelect} />
              </div>
              <Input label="제목" element="input" size="sm" placeholder="제목을 입력해주세요." />
              <Input label="문의 내용" element="textarea" size="sm" placeholder="문의 내용을 입력해주세요." />
            </div>

            <div className="flex justify-center mt-3">
              <button className="w-fit main-btn">문의 등록</button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Portal>
  );
}
