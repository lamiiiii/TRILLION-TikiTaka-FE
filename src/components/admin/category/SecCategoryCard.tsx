import {useState, useRef, useEffect} from 'react';
import {VerticalDotIcon} from '../../common/Icon';
import RegisterRequestForm from './RegisterRequestForm';
import RequestFormDetail from './RequestFormDetail'; // ✅ 요청 양식 상세 조회 컴포넌트 추가
import {deleteCategory} from '../../../api/service/categories';
import DeleteConfirmModal from '../common/DeleteConfirmModal';
import {getTicketForm} from '../../../api/service/tickets';
import { toast } from 'react-toastify';

interface SecCategoryCardProps {
  id: number; // 2차 카테고리의 고유 ID
  parentId: number; // 1차 카테고리 ID
  name: string;
  onDelete: (categoryId: number) => void; // 삭제 후 리스트에서 제거하는 함수
}

export default function SecCategoryCard({id, parentId, name, onDelete}: SecCategoryCardProps) {
  
  const [isReqFormOpen, setIsReqFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [requestForm, setRequestForm] = useState<{mustDescription: string; description: string} | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchRequestForm() {
      try {
        const formData = await getTicketForm(parentId, id);
        console.log('데이터', formData);

        // ✅ 요청 양식이 빈 값인지 확인하고 없으면 null 처리
        if (!formData.description && !formData.mustDescription) {
          setRequestForm(null);
        } else {
          setRequestForm(formData);
        }
      } catch (error) {
        setRequestForm(null); // 요청 양식이 없으면 null로 설정
      }
    }

    fetchRequestForm();
  }, [id, parentId]);

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
      await deleteCategory(id);
      onDelete(id); // 삭제 후 부모에서 리스트 업데이트
      toast.success('카테고리가 성공적으로 삭제되었습니다.');
    } catch (error) {
      toast.error('카테고리 삭제에 실패했습니다.');
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
      <div className="w-[470px] h-[48px] flex border border-gray-2 px-4 bg-gray-1 rounded-md">
        <div className="flex items-center w-full text-subtitle-regular justify-between">
          <div className="flex items-center gap-2">
            <span className="border border-gray-3 text-[10px] px-2 h-[19px] font-semibold rounded-full flex items-center justify-center leading-none">
              2차
            </span>
            <span className="text-subtitle-regular leading-none">{name}</span>
          </div>
          <div className="flex gap-2 items-center relative">
            {/* ✅ 요청 양식 존재 여부에 따라 버튼 변경 */}
            <button
              className={`px-4 py-1 text-body-regular rounded flex justify-center items-center leading-5 cursor-pointer 
    ${requestForm ? 'border border-gray-3 text-gray-800 bg-white hover:bg-gray-100 ' : 'bg-main text-white'}
  `}
              onClick={openReqForm}
            >
              {requestForm ? '상세' : '요청 양식'}
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

            {/* 메뉴 토글 버튼 */}
            <button onClick={toggleMenu}>
              <VerticalDotIcon />
            </button>

            {/* 수정/삭제 메뉴 */}
            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-[24px] right-0 mt-2 w-24 bg-white border border-gray-300 shadow-md rounded-md z-10"
              >
                <button className="w-full px-4 py-2 text-body-bold text-center hover:bg-gray-100">수정</button>
                <button className="w-full px-4 py-2 text-body-bold text-center hover:bg-gray-100 text-red-500" onClick={openDeleteModal}>
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
