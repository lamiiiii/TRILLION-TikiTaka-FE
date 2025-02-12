import { useState, useRef, useEffect } from "react";
import { VerticalDotIcon } from "../../common/Icon";
import RegisterRequestForm from "./RegisterRequestForm";
import RequestFormDetail from "./RequestFormDetail"; // 요청 양식 상세 조회 컴포넌트 추가
import { deleteCategory, updateCategory } from "../../../api/service/categories";
import DeleteConfirmModal from "../common/DeleteConfirmModal";
import { getTicketForm } from "../../../api/service/tickets";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

interface SecCategoryCardProps {
  id: number; 
  parentId: number; 
  name: string;
  onDelete: (categoryId: number) => void; 
}

export default function SecCategoryCard({ id, parentId, name, onDelete }: SecCategoryCardProps) {
  const queryClient = useQueryClient();
  const [isReqFormOpen, setIsReqFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [newCategoryName, setNewCategoryName] = useState(name); 
  const [requestForm, setRequestForm] = useState<{ mustDescription: string; description: string } | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchRequestForm() {
      try {
        const formData = await getTicketForm(parentId, id);

        if (!formData.description && !formData.mustDescription) {
          setRequestForm(null);
        } else {
          setRequestForm(formData);
        }
      } catch (error) {
        setRequestForm(null); 
      }
    }

    fetchRequestForm();
  }, [id, parentId]);

  const updateCategoryMutation = useMutation({
    mutationFn: () => updateCategory(id, { name: newCategoryName }), 
    onSuccess: () => {
      toast.success("카테고리가 성공적으로 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["categories"] }); 
      setIsEditModalOpen(false); 
    },
    onError: () => {
      toast.error("카테고리 수정에 실패했습니다.");
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: () => deleteCategory(id),
    onSuccess: () => {
      toast.success("카테고리가 성공적으로 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["categories"] }); 
      onDelete(id);
      setIsDeleteModalOpen(false);
    },
    onError: () => {
      toast.error("카테고리 삭제에 실패했습니다.");
    },
  });

  const openReqForm = () => {
    setIsReqFormOpen(true);
  };

  const closeReqForm = () => {
    setIsReqFormOpen(false);
  };

  
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsMenuOpen(false);
  };

  const openEditModal = () => {
    setNewCategoryName(name); 
    setIsEditModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleUpdate = () => {
    if (!newCategoryName.trim()) {
      toast.error("카테고리 이름을 입력하세요.");
      return;
    }
    updateCategoryMutation.mutate(); 
    setTimeout(() => {
      window.location.reload(); 
    }, 500);
  };

  const handleDelete = () => {
    deleteCategoryMutation.mutate(); 
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    });
    return () => document.removeEventListener("mousedown", () => {});
  }, []);

  return (
    <div className="flex justify-end mb-2">
      <div className="w-[470px] h-[48px] flex border border-gray-2 px-4 bg-gray-1 rounded-md">
        <div className="flex items-center w-full text-subtitle-regular justify-between">
          <div className="flex items-center gap-2">
            <span className="border border-gray-3 text-[10px] px-2 h-[19px] font-semibold rounded-full flex items-center justify-center leading-none">
              2차
            </span>
            <span className="text-subtitle-regular leading-none">{name}</span>
          </div>
          <div className="flex gap-2 items-center relative">
            <button
              className={`px-4 py-1 text-body-regular rounded flex justify-center items-center leading-5 cursor-pointer 
    ${requestForm ? "border border-gray-3 text-gray-800 bg-white hover:bg-gray-100 " : "bg-main text-white"}
  `}
              onClick={openReqForm}
            >
              {requestForm ? "상세" : "요청 양식"}
            </button>

            {isReqFormOpen &&
              (requestForm ? (
                <RequestFormDetail
                  firstCategoryId={parentId}
                  secondCategoryId={id}
                  mustDescription={requestForm.mustDescription}
                  description={requestForm.description}
                  onClose={closeReqForm}
                  name={name}
                />
              ) : (
                <RegisterRequestForm name={name} firstCategoryId={parentId} secondCategoryId={id} onClose={closeReqForm} />
              ))}

            <button onClick={toggleMenu}>
              <VerticalDotIcon />
            </button>

            {isMenuOpen && (
              <div ref={menuRef} className="absolute top-[24px] right-0 mt-2 w-24 bg-white border border-gray-300 shadow-md rounded-md z-10">
                <button className="w-full px-4 py-2 text-body-bold text-center hover:bg-gray-100" onClick={openEditModal}>
                  수정
                </button>
                <button className="w-full px-4 py-2 text-body-bold text-center hover:bg-gray-100 text-error" onClick={openDeleteModal}>
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <motion.div className="overlay" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">카테고리 수정</h2>
            <input
              type="text"
              className="border border-gray-3 rounded px-2 py-1 w-full text-body-regular"
              placeholder={name}
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <div className="flex justify-end mt-4 gap-2">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setIsEditModalOpen(false)}>
                취소
              </button>
              <button className="px-4 py-2 bg-main text-white rounded" onClick={handleUpdate}>
                확인
              </button>
            </div>
          </div>
        </div>
        </motion.div>
      )}

      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} categoryName={name} />
    </div>
  );
}
