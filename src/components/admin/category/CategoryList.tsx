import {useState} from 'react';
import {categoryDummy} from '../../../data/admin';
import CategoryCard from './CategoryCard';
import Modal from '../../common/Modal';
import {CATEGORY_MENU} from '../../../constants/admin';
import RegisterRequestForm from './RegisterRequestForm';
import RequestFormDetail from './RequestFormDetail';

export default function CategoryList() {
  const [categories, setCategories] = useState(categoryDummy);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false); 
  const [selectedRequestForm, setSelectedRequestForm] = useState<{
    title: string;
    requiredFields: string;
    description: string;
  } | null>(null);
   
  // 카테고리 추가 모달 상태
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPrimary, setNewPrimary] = useState('');
  const [newSecondary, setNewSecondary] = useState('');

  const handleDelete = () => {
    if (deleteTarget !== null) {
      setCategories(categories.filter((cat) => cat.id !== deleteTarget));
      setDeleteTarget(null);
    }
  };

  // 카테고리 추가 핸들러
  const handleAddCategory = () => {
    if (newPrimary && newSecondary) {
      const newCategory = {
        id: categories.length + 1, 
        primary: newPrimary,
        secondary: newSecondary,
        isRegistered: false, 
        requestForm: null,
      };

      setCategories([...categories, newCategory]);

      setIsAddModalOpen(false);
      setNewPrimary('');
      setNewSecondary('');
    }
  };

  const handleViewDetail = (requestForm: { title: string; requiredFields: string; description: string } | null) => {
    if (requestForm) {
      setSelectedRequestForm(requestForm);
    }
  };

  const handleCloseDetail = () => {
    setSelectedRequestForm(null);
  };

  return (
    <div className="w-[742px] mt-[20px] relative mb-[100px] bg-slate-300">
      <div className="bg-gray-18 h-full shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] flex flex-col justify-start p-4">
        <div className="flex gap-4 text-gray-700 text-title-regular mt-3 mb-5 px-4 items-center">
          <div className="w-[36%]">{CATEGORY_MENU[0]}</div>
          <div className="w-[28%]">{CATEGORY_MENU[1]}</div>
          <div className="w-[18%]">{CATEGORY_MENU[2]}</div>
          <div
            className="w-[100px] px-2 py-1 bg-main text-body-bold text-white rounded flex justify-center items-center leading-5 cursor-pointer"
            onClick={() => setIsAddModalOpen(true)} 
          >
            {CATEGORY_MENU[3]}
          </div>
        </div>

        {/* 카테고리 리스트 */}
        <div className="flex flex-col gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              {...category}
              onEdit={(id) => console.log(`수정할 ID: ${id}`)}
              onDelete={(id) => setDeleteTarget(id)}
              onRegister={() => setShowRequestForm(true)}
              onViewDetail={() => handleViewDetail(category.requestForm)}
            />
          ))}
        </div>
      </div>

      {/* 카테고리 추가 모달 */}
      {isAddModalOpen && (
        <Modal
          title="카테고리 등록"
          content="해당 부서의 카테고리를 추가합니다."
          backBtn="취소"
          onBackBtnClick={() => setIsAddModalOpen(false)}
          checkBtn="등록"
          onBtnClick={handleAddCategory}
        >
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-700 font-bold">{CATEGORY_MENU[0]}</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                placeholder="1차 카테고리를 입력해주세요"
                value={newPrimary}
                onChange={(e) => setNewPrimary(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 font-bold">{CATEGORY_MENU[1]}</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                placeholder="2차 카테고리를 입력해주세요"
                value={newSecondary}
                onChange={(e) => setNewSecondary(e.target.value)}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* 카테고리 삭제 모달 */}
      {deleteTarget && (
        <Modal
          title="해당 카테고리를 삭제하시겠습니까?"
          content="삭제된 카테고리는 복구할 수 없습니다."
          backBtn="취소"
          onBackBtnClick={() => setDeleteTarget(null)}
          checkBtn="삭제"
          onBtnClick={handleDelete}
        />
      )}

      {/* 요청 양식 등록 패널 */}
      {showRequestForm && <RegisterRequestForm onClose={() => setShowRequestForm(false)} />}

      {/* 요청 양식 상세 보기 패널 */}
      {selectedRequestForm && (
        <RequestFormDetail
          title={selectedRequestForm.title}
          requiredFields={selectedRequestForm.requiredFields}
          description={selectedRequestForm.description}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}
