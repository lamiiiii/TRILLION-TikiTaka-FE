import {motion, AnimatePresence} from 'framer-motion';
import {useState} from 'react';
import {PlusCircle, RightArrowIcon} from '../../common/Icon';
import { createTicketForm } from '../../../api/service/tickets';
import { toast } from 'react-toastify';
import Modal from '../../common/Modal';

interface RegisterRequestFormProps {
  onClose: () => void;
  name: string;
  firstCategoryId: number; // 1차 카테고리 ID
  secondCategoryId: number; // 2차 카테고리 ID
  
}

export default function RegisterRequestForm({onClose, name, firstCategoryId, secondCategoryId}: RegisterRequestFormProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [mustDescription, setMustDescription] = useState('');
  const [description, setDescription] = useState('');
  

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const openConfirmModal = () => {
    if (!mustDescription.trim() || !description.trim()) {
      toast.error('필수 요청 사항과 양식 내용을 입력해주세요.');
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleSubmit = async () => {
    setIsConfirmOpen(false); // 모달 닫기

    try {
      
      await createTicketForm(firstCategoryId, secondCategoryId, { mustDescription, description });
      toast.success('요청 양식이 성공적으로 생성되었습니다.');
      onClose();
      setTimeout(() => {
        window.location.reload(); // 등록 후 새로고침
      }, 1000);
    } catch (error) {
      toast.error('요청 양식 생성에 실패했습니다.');
    } 
  };

  return (
    <AnimatePresence>
      {!isClosing && ( // 닫힘 상태가 아닐 때만
        <motion.div
          initial={{x: '100%'}}
          animate={{x: 0}}
          exit={{x: '100%'}}
          transition={{duration: 0.3, ease: 'easeInOut'}}
          className="fixed top-0 right-0 w-[820px] h-full bg-white shadow-lg z-50 p-6 flex flex-col"
        >
          <button className="text-gray-600 text-lg mb-4 flex justify-start" onClick={handleClose}>
            <RightArrowIcon />
          </button>
          <div className="flex gap-3">
            <PlusCircle />
            <div className="text-title-bold text-gray-800 mt-0.5 flex gap-2">
              <div>[{name}]</div>
              <div>요청 양식 생성</div>
            </div>
          </div>
          <div className="w-[760px] h-[530px] bg-gray-18 mt-6 px-4 mx-auto shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)]">
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold">필수 요청 사항</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1 text-body-regular"
                placeholder="필수 요청 사항을 입력해주세요"
                value={mustDescription}
                onChange={(e) => setMustDescription(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 font-semibold">요청 내용</label>
              <textarea
                rows={5}
                className="w-full h-[320px] px-3 py-2 border border-gray-300 rounded mt-1 text-body-regular"
                placeholder="요청 내용을 입력해주세요"
                style={{ resize: 'none', outline: 'none' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
            <button
                className="px-5 py-1 mt-6 bg-main text-white text-body-bold rounded main-btn"
                onClick={openConfirmModal}
                
              >
                요청 양식 등록
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 등록 전 확인 모달 */}
      {isConfirmOpen && (
        <Modal title="요청 양식 등록"
        content={`정말로 "${name}" 요청 양식을 등록하시겠습니까?`}
        backBtn="취소"
        onBackBtnClick={() => setIsConfirmOpen(false)}
        checkBtn="등록"
        onBtnClick={handleSubmit}/>
      )}
    </AnimatePresence>
  );
}
