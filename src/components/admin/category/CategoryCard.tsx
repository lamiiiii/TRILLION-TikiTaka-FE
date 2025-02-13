import {useState, useRef, useEffect} from 'react';
import {PlusCircle, VerticalDotIcon} from '../../common/Icon';
import {createCategory, deleteCategory, updateCategory} from '../../../api/service/categories';
import DeleteConfirmModal from '../common/DeleteConfirmModal';
import {toast} from 'react-toastify';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {motion} from 'framer-motion';

interface CategoryCardProps {
  id: number;
  name: string;

  onDelete: (categoryId: number) => void;
  onAddSubCategory: (primaryId: number, newSubCategory: {id: number; name: string}) => void;
}

export default function CategoryCard({id, name, onDelete, onAddSubCategory}: CategoryCardProps) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState(name);

  const updateCategoryMutation = useMutation({
    mutationFn: () => updateCategory(id, {name: newCategoryName}),
    onSuccess: () => {
      toast.success('카테고리가 성공적으로 수정되었습니다.');
      queryClient.invalidateQueries({queryKey: ['categories']});
      setIsEditModalOpen(false);
    },
    onError: () => {
      toast.error('카테고리 수정에 실패했습니다.');
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: () => deleteCategory(id),
    onSuccess: () => {
      toast.success('카테고리가 성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries({queryKey: ['categories']});
      onDelete(id);
      setIsDeleteModalOpen(false);
    },
    onError: () => {
      toast.error('카테고리 삭제에 실패했습니다.');
    },
  });

  const handleAddSubCategory = () => {
    setIsEditing(true);
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
      toast.error('카테고리 이름을 입력하세요.');
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

  const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter' && subCategoryName.trim()) {
      try {
        const response = await createCategory(id, {name: subCategoryName});
        const newSubCategory = {id: response.data.id, name: subCategoryName};

        onAddSubCategory(id, newSubCategory);

        setSubCategoryName('');
        setIsEditing(false);
      } catch (error) {
        console.error('2차 카테고리 추가 실패:', error);
        alert('2차 카테고리 추가에 실패했습니다.');
      }
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setIsEditing(false);
      setSubCategoryName('');
    }
  };

  const handleOutMenuClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isEditing]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutMenuClick);
    return () => document.removeEventListener('mousedown', handleOutMenuClick);
  }, []);

  return (
    <div className="flex flex-col border border-gray-2 bg-white rounded text-subtitle-regular relative mb-2">
      <div className="flex justify-between px-4 py-3 items-center">
        <div className="flex items-center gap-2">
          <span className="border border-gray-3 text-[10px] px-2 h-[19px] font-semibold rounded-full flex items-center justify-center leading-none">
            1차
          </span>
          <span className="text-subtitle-regular leading-none">{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleAddSubCategory}>
            <PlusCircle />
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <VerticalDotIcon />
          </button>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-[32px] right-[16px] mt-2 w-24 bg-white border border-gray-300 shadow-md rounded-md z-10"
            >
              <button className="w-full px-4 py-2 text-body-bold text-center hover:bg-gray-100" onClick={openEditModal}>
                수정
              </button>
              <button className="w-full px-4 py-2 text-body-bold text-center hover:bg-gray-100" onClick={openDeleteModal}>
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="px-4 pb-3">
          <input
            ref={inputRef}
            type="text"
            className="border border-gray-3 rounded px-2 py-1 w-full text-body-regular"
            placeholder="2차 카테고리 입력"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            onKeyDown={handleSubmit}
            autoFocus
          />
        </div>
      )}

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

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        categoryName={name}
      />
    </div>
  );
}
