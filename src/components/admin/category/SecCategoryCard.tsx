import { useState, useRef, useEffect } from 'react';
import { VerticalDotIcon } from '../../common/Icon';
import RegisterRequestForm from './RegisterRequestForm';
import { deleteCategory } from '../../../api/service/categories';
import DeleteConfirmModal from '../common/DeleteConfirmModal';

interface SecCategoryCardProps {
  id: number; // 2차 카테고리의 고유 ID 추가
  parentId:number;
  name: string;
  token: string;
  onDelete: (categoryId: number) => void; // 삭제 후 리스트에서 제거하는 함수
}

export default function SecCategoryCard({ id, parentId, name, token, onDelete }: SecCategoryCardProps) {
  const [isReqFormOpen, setIsReqFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);


  const openReqForm = () => {
    setIsReqFormOpen(true);
  };

  const closeReqForm = () => {
    setIsReqFormOpen(false);
  };

  // 삭제 메뉴 토글
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsMenuOpen(false);
  };

  // 2차 카테고리 삭제 처리
  const handleDelete = async () => {
    try {
      await deleteCategory(token, id);
      onDelete(id); // 삭제 후 부모에서 리스트 업데이트
    } catch (error) {
      alert('카테고리 삭제에 실패했습니다.');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // 화면 다른 곳 클릭 시 메뉴 닫기
  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="flex justify-end mb-2">
      <div className="w-[390px] h-[48px] flex border border-gray-2 px-4 bg-gray-1 rounded-md">
        <div className="flex items-center w-full text-subtitle-regular justify-between">
          <div className="flex items-center gap-2">
            <span className="border border-gray-3 text-[10px] px-2 h-[19px] font-semibold rounded-full flex items-center justify-center leading-none">
              2차
            </span>
            <span className="text-subtitle-regular leading-none">{name}</span>
          </div>
          <div className="flex gap-2 items-center relative">
            <button
              className="px-4 py-1 main-btn bg-main text-body-bold text-white rounded flex justify-center items-center leading-5 cursor-pointer"
              onClick={openReqForm}
            >
              요청 양식
            </button>
            {isReqFormOpen && (
              <RegisterRequestForm
                name={name}
                firstCategoryId={parentId} // ✅ 1차 카테고리 ID 전달
                secondCategoryId={id} // ✅ 2차 카테고리 ID 전달
                token={token} // ✅ 토큰 전달
                onClose={closeReqForm}
              />
            )}

            {/* 메뉴 토글 버튼 */}
            <button onClick={toggleMenu}>
              <VerticalDotIcon />
            </button>

            {/* 수정/삭제 메뉴 */}
            {isMenuOpen && (
              <div ref={menuRef} className="absolute top-[24px] right-0 mt-2 w-24 bg-white border border-gray-300 shadow-md rounded-md z-10">
                <button className="w-full px-4 py-2 text-body-bold text-center hover:bg-gray-100">수정</button>
                <button className="w-full px-4 py-2 text-body-bold text-center hover:bg-gray-100" onClick={openDeleteModal}>
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
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
