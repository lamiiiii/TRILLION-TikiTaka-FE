import TopMenu from '../../common/TopMenu';
import TicketPreview from '../../common/ticket/TicketPreview';
import TicketOptions from '../../common/ticket/TicketOptions';
import {useNewTicketStore} from '../../../store/store';
import NewTicketContent from '../../common/ticket/NewTicketContent';
import FileUpload from '../../common/ticket/FileUpload';
import {useState} from 'react';
import TemplateContainer from '../../common/template/TemplateContainer';
import {RequiredIcon} from '../Icon';
import Modal from '../Modal';

export default function NewTicketContainer() {
  const {title, content, isUrgent, firstCategory, secondCategory, manager, ticketType, template, dueDate, dueTime, setDueDate, setDueTime} =
    useNewTicketStore();

  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const onClickBtn = () => {
    const missingFields = [];
    if (!title) missingFields.push('제목');
    if (!content) missingFields.push('내용');
    if (!dueDate) missingFields.push('마감일');

    if (missingFields.length > 0) {
      setModalMessage(`다음 필수 항목을 입력해주세요:\n${missingFields.join(', ')}`);
      setIsModalOpen(true);
      return;
    }

    // 모든 필수 값이 입력되었으면 확인 모달을 띄움
    setModalMessage('⚠️ 티켓을 생성하면 알림이 발송됩니다. 진행하시겠습니까?');
    setIsModalOpen(true);
  };
  const onClickSubmit = () => {
    setIsModalOpen(!isModalOpen);
    const requestData = {
      title,
      content,
      isUrgent,
      firstCategory,
      secondCategory,
      manager,
      ticketType,
      template,
      dueDate,
      dueTime,
    };
    console.log(requestData);
  };

  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200 gap-6">
        <TopMenu boldGrayText="티켓 생성" rightText="템플릿 리스트 / 템플릿 생성" onClick={() => setIsTemplateOpen(!isTemplateOpen)} />
        <div className="flex flex-col bg-bg-1 p-6 gap-8 min-w-[600px]">
          <TicketPreview />
          <TicketOptions />
          {firstCategory && secondCategory && (
            <div className="flex items-center text-body-regular gap-2">
              <RequiredIcon />
              필수 입력 사항:
            </div>
          )}

          <div className="flex flex-col gap-3 text-body-bold">
            <div className="flex gap-10 items-center">
              <p className="flex items-center gap-1">
                마감 기한
                <RequiredIcon />
              </p>
              <div className="flex itmes-center gap-5 p-1.5 bg-white border border-gray-2">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-min text-gray-6 text-body-regular"
                />
                <input
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  className="w-min text-gray-6 text-body-regular"
                />
              </div>
            </div>
            <NewTicketContent />
          </div>
          <FileUpload />
        </div>
        <div className="flex w-full justify-center">
          <button onClick={onClickBtn} className="btn mb-4">
            티켓 생성
          </button>
        </div>
      </div>
      <TemplateContainer isOpen={isTemplateOpen} onClose={() => setIsTemplateOpen(false)} />
      {isModalOpen && (
        <Modal
          title={modalMessage.includes('입력해주세요') ? '필수 입력 항목 누락' : '티켓을 생성하시겠습니까?'}
          content={modalMessage}
          backBtn="닫기"
          onBackBtnClick={() => {
            setIsModalOpen(false);
          }}
          checkBtn={modalMessage.includes('입력해주세요') ? undefined : '확인'}
          onBtnClick={modalMessage.includes('입력해주세요') ? undefined : onClickSubmit}
        />
      )}
    </div>
  );
}
