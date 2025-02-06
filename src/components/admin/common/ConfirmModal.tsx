import { motion } from 'framer-motion';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <p className="text-lg font-semibold text-gray-800">{message}</p>
        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>
            취소
          </button>
          <button className="px-4 py-2 bg-main text-white rounded-md" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </motion.div>
  );
}
