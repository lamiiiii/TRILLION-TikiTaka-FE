import AdminGuide from "./AdminGuide";
import CategoryList from "./CategoryList";

export default function AdminCategoryContainer() {
  return (
    <div className="flex  max-w-1200 gap-[120px]">
       <CategoryList/>
       <AdminGuide />
    </div>
  );
}
