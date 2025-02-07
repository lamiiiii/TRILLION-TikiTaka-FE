import {useEffect, useState} from 'react';
import CategoryCard from './CategoryCard';
import SecCategoryCard from './SecCategoryCard';
import {getCategoryList} from '../../../api/service/categories';
import RegCateModal from '../common/RegCateModal';

export default function CategoryList() {
  const [categories, setCategories] = useState<{primary: Category; secondaries: Category[]}[]>([]);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  const openRegModal = () => {
    setIsRegModalOpen(true); // 1차 카테고리 모달 열기
  };

  const closeRegModal = () => {
    setIsRegModalOpen(false); // 1차 카테고리 모달 닫기
  };

  

  useEffect(() => {
    getCategoryList()
      .then((primaryCategories) => {
        const secondaryRequests = primaryCategories.map((primary) =>
          getCategoryList(primary.id).then((secondaries) => ({
            primary,
            secondaries, // ✅ 원래의 2차 카테고리 데이터만 포함
          }))
        );
  
        return Promise.all(secondaryRequests);
      })
      .then((fullCategoryData) => {
        setCategories(fullCategoryData);
      })
      .catch((error) => console.error('카테고리 데이터를 불러오는데 실패했습니다.', error));
  }, []);

  return (
    <div className="w-[550px] mt-[20px] relative mb-[100px] bg-slate-300 scrollbar-hide">
      <div className="bg-gray-18 h-full shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] flex flex-col justify-start p-4">
        <div className="flex justify-between gap-4 text-gray-700 text-title-bold mt-3 mb-5 px-4 items-center">
          <div className="w-[36%]">카테고리 조회</div>
          <button
            className="w-[110px] main-btn px-2 py-1 bg-main text-body-bold text-white rounded flex justify-center items-center leading-5 cursor-pointer"
            onClick={openRegModal}
          >
            1차 카테고리 등록
          </button>
        </div>
        {isRegModalOpen && <RegCateModal onClose={closeRegModal} />}
        {/* 1차 카테고리 렌더링 */}
        {categories.map(({primary, secondaries}) => (
          <div key={primary.id}>
            {/* 1차 카테고리 */}
            <CategoryCard
              id={primary.id}
              name={primary.name}
              
              onDelete={(categoryId) => {
                setCategories((prev) => prev.filter(({primary}) => primary.id !== categoryId)); // 1차 카테고리 & 하위 2차 카테고리 삭제
              }}
              onAddSubCategory={(primaryId, newSubCategory) => {
                setCategories((prev) =>
                  prev.map((category) =>
                    category.primary.id === primaryId
                      ? {
                          ...category,
                          secondaries: [...category.secondaries, { id: newSubCategory.id, name: newSubCategory.name, parentId: primaryId }], // ✅ parentId 포함하여 업데이트
                        }
                      : category
                  )
                );
              }}
            />
            {/* 2차 카테고리 리스트 */}
            {secondaries.map((secondary) => (
              <SecCategoryCard
                key={secondary.id}
                id={secondary.id} // 2차 카테고리 ID 추가
                parentId={primary.id}
                name={secondary.name}
                onDelete={(categoryId) => {
                  setCategories((prev) =>
                    prev.map(({primary, secondaries}) => ({
                      primary,
                      secondaries: secondaries.filter((sub) => sub.id !== categoryId), // 삭제된 항목 제외
                    }))
                  );
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
