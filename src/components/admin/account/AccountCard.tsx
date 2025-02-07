import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRegistrationStatus } from "../../../api/service/registration"; 
import Modal from "../../common/Modal";
import { toast } from "react-toastify";

interface AccountCardProps {
  registrationId: number;
  username: string;
  email: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  role:"ADMIN" | "MANAGER" | "USER";
}


export default function AccountCard({ registrationId, username, email, status }: AccountCardProps) {
  const queryClient = useQueryClient();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
 

  //승인 API
  const approveMutation = useMutation({
    mutationFn: () =>
      updateRegistrationStatus({
        registrationId,
        status: "APPROVED",
        role: "USER", // 🚀 API에서 요구하는 형식으로 변환
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrationAccounts"] });
      toast.success("계정이 승인되었습니다.");
      setShowApproveModal(false);
    },
  });

  //거절 API
  const rejectMutation = useMutation({
    mutationFn: () =>
      updateRegistrationStatus({
        registrationId,
        status: "REJECTED",
        role: "USER",
        // reason: rejectReason, // 거절 사유 포함
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrationAccounts"] });
      toast.success("계정이 거절되었습니다.");
      setShowRejectModal(false);
    },
    onError: () => {
      toast.error("계정 거절에 실패했습니다.");
    },
  });

  //승인 처리 (역할 변경 후 승인)
  const handleApprove = async () => {
    try {
      
      await approveMutation.mutateAsync(); //이후 승인 요청
    } catch (error) {
      console.error("승인 과정에서 오류 발생:", error);
    }
  };

  //거절 처리
  const handleReject = async () => {
    // if (!rejectReason.trim()) {
    //   alert("거절 사유를 입력해주세요.");
    //   return;
    // }
    try {
      await rejectMutation.mutateAsync();
    } catch (error) {
      toast.error("거절 과정에서 오류 발생:");
    }
  };

  return (
    <>
      <div className="flex gap-4 py-3 px-4 border border-gray-2 bg-white items-center rounded cursor-pointer text-subtitle-regular">
        <div className="w-[12%]">{registrationId}</div>
        <div className="w-[16%]">{username}</div>
        <div className="w-[44%]">{email}</div>
        <div className="w-[16%]">
          {/*역할 선택 드롭다운 (한글 표시) */}
          사용자
        </div>
        <div className="w-[20%] flex gap-2">
          {status === "PENDING" ? (
            <>
              {/*승인 버튼 (모달 열기) */}
              <button
                onClick={() => setShowApproveModal(true)}
                className="px-4 py-1 text-subtitle-regular border rounded hover:bg-gray-8 hover:text-white whitespace-nowrap"
              >
                승인
              </button>
              {/*거절 버튼 (모달 열기) */}
              <button
                onClick={() => setShowRejectModal(true)}
                className="px-4 py-1 text-subtitle-regular border rounded hover:bg-red/80 hover:text-white"
              >
                거절
              </button>
            </>
          ) : (
            <div className="px-4 py-1 text-subtitle-regular rounded whitespace-nowrap">
              {status === "REJECTED" ? "거절됨" : "승인됨"}
            </div>
          )}
        </div>
      
      </div>

      {/*승인 확인 모달 */}
      {showApproveModal && (
        <Modal
          title="계정 승인"
          content={`선택한 (${username}) 계정을 승인하시겠습니까?`}
          backBtn="취소"
          onBackBtnClick={() => setShowApproveModal(false)}
          checkBtn="승인"
          onBtnClick={handleApprove} //승인 핸들러 실행
        />
      )}

      {/*거절 사유 입력 모달 */}
      {showRejectModal && (
        <Modal
          title="계정 거절"
          content={`정말로 (${username}) 계정 등록을 거절하시겠습니까?`}
          backBtn="취소"
          onBackBtnClick={() => setShowRejectModal(false)}
          checkBtn="거절"
          onBtnClick={handleReject} //거절 핸들러 실행
        />
      )}
    </>
  );
}
