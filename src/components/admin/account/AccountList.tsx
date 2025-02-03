import { useState } from "react";
import { ACCOUNT_MENU} from "../../../constants/admin";
import { ROLE } from "../../../constants/constants"
import Dropdown from "../../common/Dropdown";
import AccountCard from "./AccountCard";
import { accountDummy } from "../../../data/admin";
import Modal from "../../common/Modal";

export default function AccountList() {
  const [accounts, setAccounts] = useState(accountDummy);
  const [filterStatus, setFilterStatus] = useState("전체");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null); // ✅ 삭제할 계정 ID 저장

  // 부서 변경 핸들러
  const handleDepartmentChange = (id: string, newDepartment: string) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, department: newDepartment } : acc))
    );
  };

  // 소속 변경 핸들러
  const handleAffiliationChange = (id: string, newAffiliation: string) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, affiliation: newAffiliation } : acc))
    );
  };

  // 역할 변경 핸들러
  const handleRoleChange = (id: string, newRole: string) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, role: newRole } : acc))
    );
  };

  // 승인/거절 상태 변경 핸들러
  const handleStatusChange = (id: string, newStatus: string) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, status: newStatus } : acc))
    );
  };

  

   // ✅ 삭제 모달 열기
   const openDeleteModal = (id: string) => {
    setDeleteTarget(id);
  };

  // ✅ 계정 삭제 핸들러
  const handleDelete = () => {
    if (deleteTarget) {
      setAccounts(accounts.filter((acc) => acc.id !== deleteTarget));
      setDeleteTarget(null); // ✅ 모달 닫기
    }
  };

  // ✅ 선택된 승인 상태에 따른 필터링
  const filteredAccounts =
    filterStatus === "전체" ? accounts : accounts.filter((acc) => acc.status === filterStatus);

  return (
    <div className="w-full mt-[20px] relative mb-[100px]">
      <div className="bg-gray-18 h-full shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)] flex flex-col justify-start p-4">
        {/* ✅ 필터 및 사용자 정보 */}
        <div className="flex items-center justify-between px-2">
          {/* 승인 상태 드롭다운 */}
          <Dropdown
            label="승인 상태"
            options={["전체", "승인됨", "거절됨", "대기중"]}
            onSelect={setFilterStatus}
            paddingX="px-3"
          />

          {/* 사용자, 담당자, 관리자 명수 */}
          <div className="flex gap-6 text-gray-15 text-subtitle-regular">
            <span>
              {ROLE[0]} <span className="text-black text-title-bold ml-2">180명</span>
            </span>
            <span>
              {ROLE[1]} <span className="text-black text-title-bold ml-2">220명</span>
            </span>
            <span>
              {ROLE[2]} <span className="text-black text-title-bold ml-2">10명</span>
            </span>
          </div>
        </div>

        {/* 테이블 헤더 */}
        <div className="flex gap-4 py-2 text-gray-700 text-title-regular mt-5 mb-5 px-4">
          <div className="w-[10%]">{ACCOUNT_MENU[0]}</div>
          <div className="w-[12%]">{ACCOUNT_MENU[1]}</div>
          <div className="w-[22%]">{ACCOUNT_MENU[2]}</div>
          <div className="w-[22%]">{ACCOUNT_MENU[3]}</div>
          <div className="w-[12%]">{ACCOUNT_MENU[4]}</div>
          <div className="w-[24%]">{ACCOUNT_MENU[5]}</div>
        </div>

        {/* 계정 리스트 */}
        <div className="flex flex-col gap-4">
          {filteredAccounts.map((account) => (
            <AccountCard
              key={account.id}
              {...account}
              onDepartmentChange={handleDepartmentChange}
              onAffiliationChange={handleAffiliationChange}
              onRoleChange={handleRoleChange}
              onStatusChange={handleStatusChange} // ✅ 승인/거절 상태 변경
              onDelete={openDeleteModal}
            />
          ))}
        </div>
      </div>
      {/* ✅ 계정 삭제 모달 */}
      {deleteTarget && (
        <Modal
          title="해당 사용자의 계정을 삭제하시겠습니까?"
          content={`"${deleteTarget}"님의 계정이 삭제됩니다.\n해당 계정은 복구가 불가능합니다.`}
          backBtn="취소"
          onBackBtnClick={() => setDeleteTarget(null)} // ✅ 모달 닫기
          checkBtn="삭제"
          onBtnClick={handleDelete} // ✅ 계정 삭제 실행
        />
      )}
    </div>
  );
}
