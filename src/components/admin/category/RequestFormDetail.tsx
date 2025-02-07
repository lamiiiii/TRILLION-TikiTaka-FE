import {motion, AnimatePresence} from 'framer-motion';
import {useState} from 'react';
import {RightArrowIcon} from '../../common/Icon';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTicketForm, updateTicketForm } from '../../../api/service/tickets';
import { toast } from 'react-toastify';
import Modal from '../../common/Modal';
import UpdateFormModal from '../common/UpdateFormModal';

interface RequestFormDetailProps {
  mustDescription: string;
  description: string;
  firstCategoryId: number; // ✅ 1차 카테고리 ID
  secondCategoryId: number; // ✅ 2차 카테고리 ID
  onClose: () => void; 
  name:string;
}

export default function RequestFormDetail({firstCategoryId, secondCategoryId,mustDescription, description, onClose, name}: RequestFormDetailProps) {
  const queryClient = useQueryClient();
  const [isClosing, setIsClosing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newMustDescription, setNewMustDescription] = useState(mustDescription);
  const [newDescription, setNewDescription] = useState(description);

  // ✅ 티켓 폼 수정 Mutation
  const editMutation = useMutation({
    mutationFn: () =>
      updateTicketForm(firstCategoryId, secondCategoryId, {
        mustDescription: newMustDescription,
        description: newDescription,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticketForms"] });
      toast.success("티켓 양식이 수정되었습니다.");
      setShowEditModal(false);
    },
    onError: () => {
      toast.error("티켓 양식 수정에 실패했습니다.");
    },
  });

  // ✅ 티켓 폼 삭제 Mutation
  const deleteMutation = useMutation({
    mutationFn: () => deleteTicketForm(firstCategoryId, secondCategoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticketForms"] });
      toast.success("티켓 양식이 삭제되었습니다.");
      setShowDeleteModal(false);
      setTimeout(() => {
        window.location.reload(); // 페이지 새로고침
      }, 1000);
      
    },
    onError: () => {
      toast.error("티켓 양식 삭제에 실패했습니다.");
    },
  });

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
          className="fixed top-0 right-0 w-[820px] h-full bg-white shadow-lg z-50 p-6 flex flex-col"
        >
          <button className="text-gray-600 text-lg mb-4 flex justify-start" onClick={handleClose}>
            <RightArrowIcon />
          </button>
          <div className="flex justify-between items-center">
            <div className="text-title-bold text-gray-800 ">{name}</div>
            <div className="flex justify-start gap-4 ">
              <button className="px-6 py-1 bg-main text-white text-body-bold rounded" onClick={() => setShowEditModal(true)}>요청양식 수정</button>
              <button className="px-6 py-1 bg-gray-8 text-white text-body-bold  rounded" onClick={() => setShowDeleteModal(true)}>요청양식 삭제</button>
            </div>
          </div>
          <div className="w-[780px] h-[550px] bg-gray-18 mt-4 px-4 mx-auto shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)]">
            <div className="mt-4">
              <div className="block text-gray-700 font-semibold mb-2">필수 입력 사항</div>
              <div className="text-gray-600 text-body-regular">{mustDescription}</div>
            </div>
            <div className="mt-6">
              <div className="block text-gray-700 font-semibold mb-2">요청 양식</div>
              <div className="text-gray-600 text-body-regular whitespace-pre-wrap">{description}</div>
            </div>
          </div>
          {/* ✅ 수정 모달 */}
          {showEditModal && (
            <UpdateFormModal
              title="요청 양식 수정"
              content={
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">필수 입력 사항</label>
                    <textarea
                      className="border border-gray-300 p-2 w-full rounded-md"
                      value={newMustDescription}
                      onChange={(e) => setNewMustDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">요청 양식</label>
                    <textarea
                      className="border border-gray-300 p-2 w-full rounded-md"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                  </div>
                </div>
              }
              backBtn="취소"
              onBackBtnClick={() => setShowEditModal(false)}
              checkBtn="수정"
              onBtnClick={() => editMutation.mutate()}
            />
          )}

          {/* ✅ 삭제 확인 모달 */}
          {showDeleteModal && (
            <Modal
              title="요청 양식 삭제"
              content={`정말로 "${name}" 요청 양식을 삭제하시겠습니까?`}
              backBtn="취소"
              onBackBtnClick={() => setShowDeleteModal(false)}
              checkBtn="삭제"
              onBtnClick={() => deleteMutation.mutate()}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
