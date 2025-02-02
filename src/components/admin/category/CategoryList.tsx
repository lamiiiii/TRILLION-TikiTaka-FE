import { useState } from "react";
import { categoryDummy } from "../../../data/admin";
import CategoryCard from "./CategoryCard";
import Modal from "../../common/Modal";

export default function CategoryList() {
    const [categories, setCategories] = useState(categoryDummy);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  // ✅ 카테고리 삭제 핸들러
  const handleDelete = () => {
    if (deleteTarget !== null) {
      setCategories(categories.filter((cat) => cat.id !== deleteTarget));
      setDeleteTarget(null);
    }
  };
  
  return (
    <div className="w-[742px] mt-[20px] relative mb-[100px] bg-slate-300">
      <div className="bg-gray-18 h-full shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] flex flex-col justify-start p-4">
        <div className="flex gap-4 py-2 text-gray-700 text-title-regular mt-5 mb-5 px-4 items-center">
          <div className="w-[36%]">1차 카테고리</div>
          <div className="w-[28%]">2차 카테고리</div>
          <div className="w-[18%]">요청양식</div>
          <div className="w-[100px] px-2 py-1  bg-main text-body-bold text-white rounded flex justify-center items-center leading-5 cursor-pointer">
            카테고리 등록
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
            />
          ))}
        </div>
      </div>
      {/* ✅ 카테고리 삭제 모달 */}
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
    </div>
  );
}
