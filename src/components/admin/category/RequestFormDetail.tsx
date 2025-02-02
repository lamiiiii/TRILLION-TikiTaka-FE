import {motion, AnimatePresence} from 'framer-motion';
import {useState} from 'react';
import {RightArrowIcon} from '../../common/Icon';

interface RequestFormDetailProps {
  title: string;
  requiredFields: string;
  description: string;
  onClose: () => void; // 뒤로가기 버튼 클릭 시 실행할 함수
}

export default function RequestFormDetail({title, requiredFields, description, onClose}: RequestFormDetailProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true); // ✅ 애니메이션 실행
    setTimeout(() => {
      onClose(); // ✅ 애니메이션이 끝난 후 상태 변경
    }, 300); // ✅ framer-motion 애니메이션 시간과 맞추기 (0.3s)
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          initial={{x: '100%'}} // 시작 위치 (오른쪽 밖)
          animate={{x: 0}} // 나타날 때
          exit={{x: '100%'}} // 사라질 때 (부드럽게)
          transition={{duration: 0.3, ease: 'easeInOut'}} // 부드러운 애니메이션
          className="fixed top-0 right-0 w-[900px] h-full bg-white shadow-lg z-50 p-6 flex flex-col"
        >
          {/* 뒤로가기 버튼 */}
          <button className="text-gray-600 text-lg mb-4 flex justify-start" onClick={handleClose}>
            <RightArrowIcon />
          </button>

          {/* 제목 */}
          <div className="flex justify-between items-center">
            <div className="text-title-bold text-gray-800 ">{title}</div>
            {/* 수정 / 삭제 버튼 */}
            <div className="flex justify-start gap-4 ">
              <button className="px-6 py-1 bg-main text-white text-body-bold rounded">요청양식 수정</button>
              <button className="px-6 py-1 bg-gray-8 text-white text-body-bold  rounded">요청양식 삭제</button>
            </div>
          </div>

          {/* 요청 양식 정보 */}
          <div className="w-[850px] h-[550px] bg-gray-18 mt-4 px-4 mx-auto shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)]">
            {/* 필수 입력 사항 */}
            <div className="mt-4">
              <div className="block text-gray-700 font-semibold mb-2">필수 입력 사항</div>
              <div className="text-gray-600 text-body-regular">{requiredFields}</div>
            </div>

            {/* 요청 양식 설명 */}
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
