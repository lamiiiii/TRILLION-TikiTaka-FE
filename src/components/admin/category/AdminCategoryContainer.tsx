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
    <div className="flex  max-w-1200 gap-[120px] ">
       <CategoryList/>
       <AdminGuide />
    </div>
  );
}
