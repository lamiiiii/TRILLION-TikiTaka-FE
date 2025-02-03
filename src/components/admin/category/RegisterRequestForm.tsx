import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PlusCircle, RightArrowIcon } from "../../common/Icon";

interface RegisterRequestFormProps {
  onClose: () => void; // 뒤로가기 
}

export default function RegisterRequestForm({ onClose }: RegisterRequestFormProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true); 
    setTimeout(() => {
      onClose(); 
    }, 300); 
  };

  return (
    <AnimatePresence>
      {!isClosing && ( // 닫힘 상태가 아닐 때만 렌더링
        <motion.div
          initial={{ x: "100%" }} 
          animate={{ x: 0 }} 
          exit={{ x: "100%" }} 
          transition={{ duration: 0.3, ease: "easeInOut" }} 
          className="fixed top-0 right-0 w-[900px] h-full bg-white shadow-lg z-50 p-6 flex flex-col"
        >
          {/* 뒤로가기 버튼 */}
          <button className="text-gray-600 text-lg mb-4 flex justify-start" onClick={handleClose}>
            <RightArrowIcon />
          </button>

          {/* 제목 */}
          <div className="flex gap-3">
            <PlusCircle />
            <div className="text-title-bold text-gray-800 mt-0.5">요청 양식 생성</div>
          </div>

          {/* 입력 필드 */}
          <div className="w-[850px] h-[550px] bg-gray-18 mt-4 px-4 mx-auto shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)]">
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold">필수 요청 사항</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1 text-body-regular"
                placeholder="필수 요청 사항을 입력해주세요"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 font-semibold">요청 내용</label>
              <textarea
                rows={5}
                className="w-full h-[320px] px-3 py-2 border border-gray-300 rounded mt-1 text-body-regular"
                placeholder="요청 내용을 입력해주세요"
                style={{ resize: "none", outline: "none" }}
              />
            </div>

            {/* 등록 버튼 */}
            <div className="flex justify-center">
              <button className="px-6 py-2 mt-6 bg-main text-white text-[14px] font-semibold rounded">
                요청 양식 생성
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
