import {useRef, useState} from 'react';
import {motion} from 'framer-motion';
import {CloseIcon, ListIcon, PlusIcon} from '../Icon';
import TemplateListView from './TemplateListView';
import TemplateDetailView from './TemplateDetailView';
import TemplateCreateView from './TemplateCreateView';

interface TemplateContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplateContainer({isOpen, onClose}: TemplateContainerProps) {
  const [width, setWidth] = useState(700); // 기본 너비
  const minWidth = 400; // 최소 너비
  const maxWidth = 1000; // 최대 너비
  const widthRef = useRef(width);

  const [activeView, setActiveView] = useState<'list' | 'detail' | 'create'>('list');
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      requestAnimationFrame(() => {
        const newWidth = startWidth + (startX - moveEvent.clientX);
        if (newWidth >= minWidth && newWidth <= maxWidth) {
          widthRef.current = newWidth;
          setWidth(newWidth); // setWidth를 최소화하여 리렌더링을 줄임
        }
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed top-14 right-0 h-full bg-white shadow-lg shadow-gray-500/50 transition-all"
      animate={{width}}
      transition={{duration: 0.3, ease: 'easeInOut'}}
    >
      <div className="top-container">
        <div className="flex flex-col max-w-1200 py-4 gap-4">
          {/* 상단 버튼 */}
          <div className="flex w-full gap-3">
            <button onClick={onClose}>
              <CloseIcon />
            </button>
            <button onClick={() => setActiveView('create')}>
              <PlusIcon />
            </button>
            {activeView !== 'list' && (
              <button onClick={() => setActiveView('list')}>
                <ListIcon />
              </button>
            )}
          </div>
          {/* 뷰 전환 */}
          {activeView === 'list' && (
            <TemplateListView
              onSelect={(templateId: number) => {
                setSelectedTemplateId(templateId);
                setActiveView('detail');
              }}
            />
          )}
          {activeView === 'detail' && selectedTemplateId !== null && <TemplateDetailView templateId={selectedTemplateId} />}
          {activeView === 'create' && <TemplateCreateView onCancel={() => setActiveView('list')} />}
        </div>
      </div>
      {/* 사이즈 조절 */}
      <div className="absolute top-0 left-0 w-2 h-full cursor-ew-resize bg-white" onMouseDown={handleMouseDown} />
    </motion.div>
  );
}
