import AdminStatContainer from "../../components/admin/statistics/AdminStatContainer";
import AdminTopMenu from "./common/AdminTopMenu";

export default function AdminStatistics() {
  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200">
        <AdminTopMenu boldBlackText="통계 관리"/>
        <AdminStatContainer/>
      </div>
    </div>
  );
}
