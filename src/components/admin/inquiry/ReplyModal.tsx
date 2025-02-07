import { useState } from "react";
import { submitAnswer } from "../../../api/service/inquiry";
import AdminModal from "../common/AdminModal";

interface ReplyModalProps {
  inquiryId: number;
  onClose: () => void;
  onAnswerSubmit: () => void; // 🚀 답변 제출 후 새로고침을 위해 추가
}

export default function ReplyModal({ inquiryId, onClose, onAnswerSubmit }: ReplyModalProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    try {
      await submitAnswer(inquiryId, answer);
      alert("답변이 등록되었습니다!");
      onAnswerSubmit(); // 🚀 답변 제출 후 리스트 새로고침
      onClose(); // 모달 닫기
    } catch (error) {
      alert("답변 등록에 실패했습니다.");
    }
  };

  return (
    <AdminModal title="문의 답변 등록" onBackBtnClick={onClose} backBtn="닫기" checkBtn="등록" onBtnClick={handleSubmit}>
      <div className="mt-4">
        <label className="block text-gray-700 text-[14px] font-semibold">문의 답변</label>
        <textarea
          rows={4}
          className="w-full text-[12px] px-3 py-2 border border-gray-300 rounded mt-1 resize-none"
          placeholder="답변을 입력해주세요"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
    </AdminModal>
  );
}
