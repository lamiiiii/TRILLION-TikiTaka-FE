import {motion, AnimatePresence} from 'framer-motion';
import {useState} from 'react';
import {RightArrowIcon} from '../../common/Icon';

interface RequestFormDetailProps {
  title: string;
  requiredFields: string;
  description: string;
  onClose: () => void; 
}

export default function RequestFormDetail({title, requiredFields, description, onClose}: RequestFormDetailProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true); 
    setTimeout(() => {
      onClose(); 
    }, 300); 
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          initial={{x: '100%'}} 
          animate={{x: 0}} 
          exit={{x: '100%'}} 
          transition={{duration: 0.3, ease: 'easeInOut'}} 
          className="fixed top-0 right-0 w-[900px] h-full bg-white shadow-lg z-50 p-6 flex flex-col"
        >
          <button className="text-gray-600 text-lg mb-4 flex justify-start" onClick={handleClose}>
            <RightArrowIcon />
          </button>
          <div className="flex justify-between items-center">
            <div className="text-title-bold text-gray-800 ">{title}</div>
            <div className="flex justify-start gap-4 ">
              <button className="px-6 py-1 bg-main text-white text-body-bold rounded">요청양식 수정</button>
              <button className="px-6 py-1 bg-gray-8 text-white text-body-bold  rounded">요청양식 삭제</button>
            </div>
          </div>
          <div className="w-[850px] h-[550px] bg-gray-18 mt-4 px-4 mx-auto shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)]">
            <div className="mt-4">
              <div className="block text-gray-700 font-semibold mb-2">필수 입력 사항</div>
              <div className="text-gray-600 text-body-regular">{requiredFields}</div>
            </div>
            <div className="mt-6">
              <div className="block text-gray-700 font-semibold mb-2">요청 양식</div>
              <div className="text-gray-600 text-body-regular whitespace-pre-wrap">{description}</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
