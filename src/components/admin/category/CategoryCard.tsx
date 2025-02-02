import { useState } from "react";
import { VerticalDotIcon } from "../../common/Icon";

interface CategoryCardProps {
  id: number;
  primary: string;
  secondary: string;
  isRegistered: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function CategoryCard({ id, primary, secondary, isRegistered, onEdit, onDelete }: CategoryCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex gap-4 py-3 px-4 border border-gray-2 bg-white items-center rounded cursor-pointer text-subtitle-regular relative">
      {/* 1차 카테고리 */}
      <div className="w-[36%] flex items-center justify-between">
        {primary}
        <button onClick={() => setShowMenu(!showMenu)} className="mr-5">
          <VerticalDotIcon />
        </button>
      </div>

      {/* 2차 카테고리 */}
      <div className="w-[28%] flex items-center justify-between">
        {secondary}
        <button onClick={() => setShowMenu(!showMenu)} className="mr-5">
          <VerticalDotIcon />
        </button>
      </div>

      {/* 요청양식 버튼 */}
      <div className="w-[18%]">
        <div
          className={`w-[72px] px-2 py-1 rounded flex justify-center items-center leading-5 cursor-pointer ${
            isRegistered ? "border border-gray-8 text-gray-15 text-body-bold w-[60px]" : "bg-main text-white text-body-bold"
          }`}
        >
          {isRegistered ? "상세" : "등록하기"}
        </div>
      </div>

      <div className="w-[100px]"></div>

      {/* 수정/삭제 메뉴 */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-[100px] bg-white shadow-md border rounded text-center">
          <button onClick={() => onEdit(id)} className="w-full px-3 py-2 hover:bg-gray-100">
            수정
          </button>
          <button onClick={() => onDelete(id)} className="w-full px-3 py-2 text-red-500 hover:bg-red-100">
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
