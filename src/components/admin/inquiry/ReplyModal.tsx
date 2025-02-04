import AdminModal from '../common/AdminModal';

interface ReplyModalProps {
  inquiry: {id: number; user: string; title: string; content: string};
  onClose: () => void;
}

export default function ReplyModal({inquiry, onClose}: ReplyModalProps) {
  return (
    <AdminModal title="문의 답변 등록" onBackBtnClick={onClose} backBtn="닫기" checkBtn="등록" onBtnClick={() => console.log('답변 등록')}>
      <div className="mb-4">
        <input
          type="text"
          className="w-[200px] px-3 py-1 border font-semibold border-gray-2 bg-gray-1 rounded text-subtitle-regular text-main"
          value={inquiry.user}
          readOnly
        />
      </div>
      <div className="text-subtitle-regular font-semibold">{inquiry.title}</div>
      <div className="text-gray-700 text-[12px] py-2 border-b border-gray-2">{inquiry.content}</div>
      <div className="mt-4">
        <label className="block text-gray-700 text-[14px] font-semibold">문의 답변</label>
        <textarea
          rows={4}
          className="w-full text-[12px] px-3 py-2 border border-gray-300 rounded mt-1 resize-none"
          placeholder="답변을 입력해주세요"
        />
      </div>
    </AdminModal>
  );
}
