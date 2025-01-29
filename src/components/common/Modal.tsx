interface ModalProps {
  title?: string;
  content?: string;
  backBtn: string;
  onBackBtnClick: () => void;
  checkBtn?: string;
  onBtnClick?: () => void;
  children?: React.ReactNode; // 드롭다운/텍스트
  blockOutsideClick?: boolean;
}

import {useOutsideClick} from '../../hooks/useOutsideClick';

export default function Modal({title, content, backBtn, onBackBtnClick, checkBtn, onBtnClick, children, blockOutsideClick}: ModalProps) {
  const ref = !blockOutsideClick ? useOutsideClick(onBackBtnClick) : null;

  return (
    <div className="overlay">
      {/* <div className="absolute w-full h-full  flex-center"> */}
      <div ref={ref} className="w-full max-w-[400px] flex flex-col gap-6 bg-white p-6 rounded shadow-1 border border-gray-2">
        <div>
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="flex flex-col gap-2 text-center">
              <span className={`whitespace-pre-wrap text-black text-title-bold `}>{title}</span>
              <span className={`whitespace-pre-wrap text-xs text-main font-regular `}>{content}</span>
            </div>
          </div>
          {children}
        </div>
        <div className="flex gap-4">
          <button onClick={onBackBtnClick} className="btn-back w-full">
            {backBtn}
          </button>
          {checkBtn && (
            <button onClick={onBtnClick} className="btn-check w-full">
              {checkBtn}
            </button>
          )}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
