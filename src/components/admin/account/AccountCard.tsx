import { useState } from "react";
import { DotIcon } from "../../common/Icon";
import RoleDropdown from "./RoleDropdown";

interface AccountCardProps {
  id: string;
  name: string;
  affiliation: string;
  role: string;
  status: string;
  onRoleChange: (id: string, newRole: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
  onReject: (id: string) => void; // ✅ 거절 시 삭제 기능 추가
}

export default function AccountCard({
  id,
  name,
  affiliation,
  role,
  status,
  onRoleChange,
  onStatusChange,
  onDelete,
  onReject, // ✅ 새로운 onReject 추가
}: AccountCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex gap-4 py-3 px-4 border border-gray-2 bg-white items-center rounded cursor-pointer text-subtitle-regular">
      <div className="w-[12%]">{id}</div>
      <div className="w-[16%]">{name}</div>
      <div className="w-[44%]">{affiliation}</div>
      <div className="w-[16%]">
        <RoleDropdown label={role} options={["사용자", "담당자", "관리자"]} onSelect={(value) => onRoleChange(id, value)} />
      </div>
      
      {/* 승인/거절 상태 */}
      <div className="w-[20%] flex gap-2 relative">
        {status === "대기중" ? (
          <>
            {/* ✅ 승인 버튼 → 승인 대기 목록에서 계정 목록으로 이동 */}
            <button
              onClick={() => onStatusChange(id, "승인")}
              className="px-4 py-1 text-subtitle-regular border rounded hover:bg-gray-8 hover:text-white whitespace-nowrap"
            >
              승인
            </button>
            
            {/* ✅ 거절 버튼 → 즉시 계정 삭제 */}
            <button
              onClick={() => onReject(id)} // ✅ onReject 실행
              className="px-4 py-1 text-subtitle-regular border rounded hover:bg-red/80 hover:text-white"
            >
              거절
            </button>
          </>
        ) : (
          <span className={`px-4 py-1 text-subtitle-regular rounded ${status === "승인" ? "text-blue-600 " : "text-red-600"}`}>
            {status}
          </span>
        )}

        {/* ✅ 승인된 경우 메뉴 버튼 (삭제 가능) */}
        {status === "승인" && (
          <div className="ml-[120px] mt-1">
            <button onClick={() => setShowMenu(!showMenu)}>
              <DotIcon />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-[100px] bg-white shadow-md rounded border text-center">
                <button onClick={() => onDelete(id)} className="w-full rounded px-3 py-2 text-[12px] font-semibold hover:bg-gray-1">
                  계정 삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
