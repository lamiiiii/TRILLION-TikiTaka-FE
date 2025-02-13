import { useEffect } from "react";
import AdminGuide from "./AdminGuide";
import CategoryList from "./CategoryList";

export default function AdminCategoryContainer() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="flex max-w-[1200px] gap-[50px] justify-between">
      <div className="flex-1">
        <CategoryList />
      </div>
      <div className="w-[470px] flex-shrink-0 mt-[160px] mr-[30px]">
        <AdminGuide />
      </div>
    </div>
  );
}
