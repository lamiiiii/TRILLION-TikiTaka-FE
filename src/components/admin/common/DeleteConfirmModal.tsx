interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    categoryName: string;
  }
  
  export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, categoryName }: DeleteConfirmModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[350px] text-center">
          <h2 className="text-lg font-semibold">카테고리 삭제</h2>
          <p className="mt-2 text-sm text-gray-600">"{categoryName}" 카테고리를 삭제하시겠습니까?</p>
          <div className="flex justify-center gap-4 mt-6">
            <button className="w-[80px] h-[30px] btn-back  rounded-md" onClick={onClose}>취소</button>
            <button className="w-[80px] h-[30px] btn-check  rounded-md" onClick={onConfirm}>삭제</button>
          </div>
        </div>
      </div>
    );
  }
  