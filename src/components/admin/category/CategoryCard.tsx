import {useState, useRef, useEffect} from 'react';
import {PlusCircle, VerticalDotIcon} from '../../common/Icon';
import {createCategory, deleteCategory} from '../../../api/service/categories';
import DeleteConfirmModal from '../common/DeleteConfirmModal';
import { toast } from 'react-toastify';

interface CategoryCardProps {
  id: number; // 1차 카테고리 ID (2차 카테고리의 parentId)
  name: string;
  
  onDelete: (categoryId: number) => void;
  onAddSubCategory: (primaryId: number, newSubCategory: { id: number; name: string }) => void;
}

export default function CategoryCard({id, name,  onDelete, onAddSubCategory}: CategoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState(''); // 입력된 2차 카테고리 이름
  // const [subCategories, setSubCategories] = useState<{id: number; name: string}[]>([]); // 추가된 2차 카테고리 목록
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  

  // PlusCircle 클릭 시 Input 표시
  const handleAddSubCategory = () => {
    setIsEditing(true);
  };

  // 삭제 버튼 클릭 시 모달 열기
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleDelete = async () => {
      try {
        await deleteCategory(id);
        onDelete(id); // 삭제 후 부모에서 리스트 업데이트
        toast.success('카테고리가 성공적으로 삭제되었습니다.');
      } catch (error) {
        toast.error('카테고리 삭제에 실패했습니다.');
      } finally {
        setIsDeleteModalOpen(false);
      }
    };

  // Enter 키 입력 시 API 요청
  const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && subCategoryName.trim()) {
      try {
        const response = await createCategory( id, { name: subCategoryName });
        const newSubCategory = { id: response.data.id, name: subCategoryName };

        // ✅ 부모 컴포넌트(CategoryList.tsx)에서만 2차 카테고리 추가하도록 콜백 실행
        onAddSubCategory(id, newSubCategory);

        setSubCategoryName('');
        setIsEditing(false);
      } catch (error) {
        console.error('2차 카테고리 추가 실패:', error);
        alert('2차 카테고리 추가에 실패했습니다.');
      }
    }
  };

  // 화면 다른 곳 클릭 시 Input 숨기기
  const handleOutsideClick = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setIsEditing(false);
      setSubCategoryName('');
    }
  };

  // 화면 다른 곳 클릭 시 메뉴 닫기
  const handleOutMenuClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  // 이벤트 리스너 추가 및 정리
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
        {/* 1차 카테고리 이름 */}
        <div className="flex items-center gap-2">
          <button onClick={handleAddSubCategory}>
            <PlusCircle />
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <VerticalDotIcon />
          </button>
          {/* 수정/삭제 메뉴 */}
          {isMenuOpen && (
            <div ref={menuRef} className="absolute top-[32px] right-[16px] mt-2 w-24 bg-white border border-gray-300 shadow-md rounded-md z-10">
              <button className="w-full px-4 py-2 text-body-bold text-center hover:bg-gray-100">수정</button>
              <button className="w-full px-4 py-2 text-body-bold text-center hover:bg-gray-100" onClick={openDeleteModal}>
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      {/* PlusCircle 클릭 시 Input 나타남 */}
      {isEditing && (
        <div className="px-4 pb-3">
          <input
            ref={inputRef}
            type="text"
            className="border border-gray-3 rounded px-2 py-1 w-full text-body-regular"
            placeholder="2차 카테고리 입력"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            onKeyDown={handleSubmit} // Enter 입력 처리
            autoFocus
          />
        </div>
      )}

      
      {/* ✅ 추가된 2차 카테고리 리스트 */}
      {/* {subCategories.length > 0 && (
        <div className="px-4 pb-3">
          {subCategories.map((sub) => (
            <SecCategoryCard key={sub.id} id={sub.id} name={sub.name} token={token} onDelete={onDelete}/>
          ))}
        </div>
      )} */}

      {/* 삭제 모달 */}
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDelete} 
        categoryName={name} 
      />
    </div>
  );
}
