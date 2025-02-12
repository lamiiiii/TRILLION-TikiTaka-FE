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
 
  const approveMutation = useMutation({
    mutationFn: () =>
      updateRegistrationStatus({
        registrationId,
        status: "APPROVED",
        role: "USER", 
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrationAccounts"] });
      toast.success("계정이 승인되었습니다.");
      setShowApproveModal(false);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: () =>
      updateRegistrationStatus({
        registrationId,
        status: "REJECTED",
        role: "USER",
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

  const handleApprove = async () => {
    try {
      
      await approveMutation.mutateAsync(); 
    } catch (error) {
      console.error("승인 과정에서 오류 발생:", error);
    }
  };

  const handleReject = async () => {
    
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
          사용자
        </div>
        <div className="w-[20%] flex gap-2">
          {status === "PENDING" ? (
            <>
              <button
                onClick={() => setShowApproveModal(true)}
                className="px-4 py-1 text-subtitle-regular border rounded hover:bg-gray-8 hover:text-white whitespace-nowrap"
              >
                승인
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                className="px-4 py-1 text-subtitle-regular border rounded hover:bg-error/80 hover:text-white"
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
      {showApproveModal && (
        <Modal
          title="계정 승인"
          content={`선택한 (${username}) 계정을 승인하시겠습니까?`}
          backBtn="취소"
          onBackBtnClick={() => setShowApproveModal(false)}
          checkBtn="승인"
          onBtnClick={handleApprove} 
        />
      )}

      {showRejectModal && (
        <Modal
          title="계정 거절"
          content={`정말로 (${username}) 계정 등록을 거절하시겠습니까?`}
          backBtn="취소"
          onBackBtnClick={() => setShowRejectModal(false)}
          checkBtn="거절"
          onBtnClick={handleReject} 
        />
      )}
    </>
  );
}
