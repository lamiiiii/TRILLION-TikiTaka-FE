import {useState} from 'react';
import {useNewTicketStore} from '../../../store/store';
import {AlertIcon, DownIcon} from '../Icon';
import {motion} from 'framer-motion';

// 미리보기 컴포넌트
export default function TicketPreview() {
  const {isUrgent, firstCategory, secondCategory, title, content, manager, ticketType, dueDate, dueTime} = useNewTicketStore();
  const [isOpen, setIsOpen] = useState(true);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // 시간 포맷팅 함수 (24시간 이내 남은 시간 계산)
  const formatTimeLeft = (dueDateString: string, dueTimeString: string) => {
    const dueDateTime = new Date(`${dueDateString}T${dueTimeString}`);
    const now = new Date();
    const timeDiff = dueDateTime.getTime() - now.getTime(); // 밀리초 단위 차이
    // const hoursLeft = Math.floor(timeDiff / (1000 * 3600)); // 남은 시간 계산

    if (isNaN(dueDateTime.getTime())) {
      return ''; // dueTime이 없는 경우 공백을 반환
    }

    const hours = String(dueDateTime.getHours()).padStart(2, '0');
    const minutes = String(dueDateTime.getMinutes()).padStart(2, '0');

    if (timeDiff <= 24 * 60 * 60 * 1000 && timeDiff > 0) {
      return `${formatDate(dueDateString)} ${hours}:${minutes}`; // 24시간 이내라면 날짜와 시간 표시
    }

    return `${formatDate(dueDateString)} ${hours}:${minutes}`; // 24시간 이상일 경우 날짜와 시간 표시
  };

  const formattedDate = dueDate ? `${formatTimeLeft(dueDate, dueTime)}` : '';

  return (
    <div className="preview">
      <div className="flex justify-between ">
        <p className="text-subtitle text-gray-15">티켓 미리보기</p>
        <button onClick={() => setIsOpen(!isOpen)} className={`cursor-pointer transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <DownIcon />
        </button>
      </div>
      {isOpen && (
        <motion.div
          className={`w-full bg-gray-1 border rounded p-2 flex justify-between text-subtitle-regular ${isUrgent ? 'border-error' : 'border-gray-2'}`}
          initial={{opacity: 0}}
          animate={{opacity: isOpen ? 1 : 0}}
          transition={{duration: 0.2}}
          style={{overflow: 'hidden'}}
        >
          <div className="flex gap-4 items-center">
            <p className="text-main">#0</p>
            <div className="flex flex-col w-32">
              <p className={`${firstCategory ? '' : 'text-gray-4'}`}>{firstCategory?.name || '1차 카테고리 미지정'}</p>
              <p className={`text-body-regular ${secondCategory ? 'text-gray-6' : 'text-gray-4'}`}>
                {secondCategory?.name || '2차 카테고리 미지정'}
              </p>
            </div>
            <div className="flex flex-col w-80">
              <div className="flex items-center gap-1">
                <p>{isUrgent && <AlertIcon className="text-error w-4 h-4" />}</p>
                <p className={`${ticketType.typeId !== 0 ? '' : 'text-error'}`}>[{ticketType.typeName || '유형'}]</p>
                <p className={`${title ? '' : 'text-error'} truncate`}>{title || '제목을 작성해주세요'}</p>
              </div>
              <p className={`text-body-regular ${content ? 'text-gray-6' : 'text-error'} truncate`}>{content || '내용을 작성해주세요'}</p>
            </div>
          </div>
          <div className="flex gap-8 items-center">
            <p className={`${formattedDate ? '' : 'text-error'}`}>{formattedDate || '-'}</p>
            <div className="bg-white border border-gray-2 py-1 px-4 my-2 rounded items-center">{manager || '전체 담당자'}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
