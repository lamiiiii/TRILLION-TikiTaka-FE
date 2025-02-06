import CategoryList from "./CategoryList";

export default function AdminCategoryContainer() {
  return (
    <div className="flex  max-w-1200 gap-[80px]">
       <CategoryList/>
       <div>티켓 유형 조회 </div>
    </div>
  );
}
