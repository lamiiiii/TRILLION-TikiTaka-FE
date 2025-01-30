import { useState } from "react";
import Dropdown from "../../common/Dropdown"; // 공용 드롭다운 사용

interface AccountCardProps {
  id: string;
  name: string;
  department: string;
  affiliation: string;
  role: string;
  onDepartmentChange: (id: string, newDepartment: string) => void;
  onAffiliationChange: (id: string, newAffiliation: string) => void;
  onRoleChange: (id: string, newRole: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function AccountCard({
  id,
  name,
  department,
  affiliation,
  role,
  onDepartmentChange,
  onAffiliationChange,
  onRoleChange,
  onApprove,
  onReject,
}: AccountCardProps) {
  const [selectedDepartment, setSelectedDepartment] = useState(department);
  const [selectedAffiliation, setSelectedAffiliation] = useState(affiliation);
  const [selectedRole, setSelectedRole] = useState(role);

  const handleDepartmentSelect = (value: string) => {
    setSelectedDepartment(value);
    onDepartmentChange(id, value);
  };

  const handleAffiliationSelect = (value: string) => {
    setSelectedAffiliation(value);
    onAffiliationChange(id, value);
  };

  const handleRoleSelect = (value: string) => {
    setSelectedRole(value);
    onRoleChange(id, value);
  };

  return (
    <div className="flex gap-4 py-3 px-4 border border-gray-2 bg-white items-center rounded hover:bg-gray-1 cursor-pointer">
      {/* ID */}
      <div className="w-[10%] text-body-regular text-gray-700">{id}</div>

      {/* 이름 */}
      <div className="w-[12%] text-body-regular text-gray-700">{name}</div>

      {/* 부서 드롭다운 */}
      <div className="w-[22%]">
        <Dropdown
          label={selectedDepartment}
          options={["인프라 엔지니어링", "소프트웨어 개발", "보안"]}
          onSelect={handleDepartmentSelect}
          paddingX="px-3"
        />
      </div>

      {/* 소속 드롭다운 */}
      <div className="w-[22%]">
        <Dropdown
          label={selectedAffiliation}
          options={["인프라 엔지니어링 1팀", "인프라 엔지니어링 2팀", "보안팀"]}
          onSelect={handleAffiliationSelect}
          paddingX="px-3"
        />
      </div>

      {/* 역할 드롭다운 */}
      <div className="w-[12%]">
        <Dropdown
          label={selectedRole}
          options={["사용자", "담당자", "관리자"]}
          onSelect={handleRoleSelect}
          paddingX="px-3"
        />
      </div>

      {/* 승인 상태 버튼 */}
      <div className="w-[24%] flex gap-2">
        <button
          className="px-5 py-1 text-subtitle-regular border border-gray-6 rounded-md hover:bg-gray-8 hover:text-white"
          onClick={() => onApprove(id)}
        >
          승인
        </button>
        <button
          className="px-5 py-1 text-subtitle-regular border border-gray-6 rounded-md hover:bg-red-5 hover:text-red"
          onClick={() => onReject(id)}
        >
          거절
        </button>
      </div>
    </div>
  );
}
