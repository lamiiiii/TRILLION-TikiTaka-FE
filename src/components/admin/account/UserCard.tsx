import {useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {patchDeleteUser, patchUserRole} from '../../../api/service/users'; // 역할 변경 API
import Modal from '../../common/Modal';
import RoleDropdown from './RoleDropdown';
import {DotIcon} from '../../common/Icon';
import {toast} from 'react-toastify';

interface UserCardProps {
    userId: number; // userId로 변경
    username: string;
    email: string;
    role: string;
  }

// 역할 변환 맵핑 (영어 ↔ 한글)
const roleApiToDisplay: Record<string, string> = {
    ADMIN: "관리자",
    MANAGER: "담당자",
    USER: "사용자",
  };
  
  const roleDisplayToApi: Record<string, "ADMIN" | "MANAGER" | "USER"> = {
    관리자: "ADMIN",
    담당자: "MANAGER",
    사용자: "USER",
  };

export default function AccountCard({ userId, username, email, role }: UserCardProps) {
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState(roleApiToDisplay[role] || "사용자"); // 기본값

  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 계정 삭제 API (patchDeleteUser 사용)
  const deleteMutation = useMutation({
    mutationFn: () => patchDeleteUser(userId), // userId로 수정
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAccounts"] }); // 삭제 후 UI 갱신
      toast.success("계정이 삭제되었습니다.");
      setShowDeleteModal(false);
    },
    onError: () => {
      toast.error("계정 삭제에 실패했습니다.");
    },
  });

  // 역할 변경 API
  const updateRoleMutation = useMutation({
    mutationFn: () =>
      patchUserRole(userId, {
        role: roleDisplayToApi[selectedRole], // UI에서 선택한 값을 API 형식으로 변환
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAccounts"] });
      toast.success(`역할이 ${selectedRole}로 변경되었습니다.`);
    },
    onError: () => {
      toast.error("역할 변경에 실패했습니다.");
    },
  });

  return (
    <div className="flex gap-4 py-3 px-4 border border-gray-2 bg-white items-center rounded cursor-pointer text-subtitle-regular">
      <div className="w-[12%]">{userId}</div>
      <div className="w-[16%]">{username}</div>
      <div className="w-[44%]">{email}</div>
      <div className="w-[16%]">
        {/* 역할 선택 드롭다운 (한글 표시) */}
        <RoleDropdown
          label={selectedRole}
          options={["관리자", "담당자", "사용자"]}
          onSelect={(value) => {
            setSelectedRole(value as "관리자" | "담당자" | "사용자");
            updateRoleMutation.mutate(); // 선택 즉시 역할 변경 요청
          }}
        />
      </div>
      <div className="w-[20%] flex gap-2">승인</div>
      <div className="absolute right-[40px] mt-1">
        <button onClick={() => setShowMenu(!showMenu)}>
          <DotIcon />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-1 w-[100px] bg-white shadow-md rounded border text-center">
            <button onClick={() => setShowDeleteModal(true)} className="w-full rounded py-2 text-[12px] font-semibold">
              <div className="hover:bg-gray-1 text-[12px] rounded-md mx-2 hover:border hover:border-gray-2 text-gray-15">계정 삭제</div>
            </button>
          </div>
        )}
      </div>
      {/* 계정 삭제 확인 모달 */}
      {showDeleteModal && (
        <Modal
          title="계정 삭제"
          content={`"${username}" 계정을 삭제하시겠습니까?`}
          backBtn="취소"
          onBackBtnClick={() => setShowDeleteModal(false)}
          checkBtn="삭제"
          onBtnClick={() => deleteMutation.mutate()}
        />
      )}
    </div>
  );
}
