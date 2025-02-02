import TopMenu from '../../common/TopMenu';
import TicketPreview from '../../common/ticket/TicketPreview';
import TicketOptions from '../../common/ticket/TicketOptions';
import {useNewTicketStore} from '../../../store/store';
import NewTicketContent from '../../common/ticket/NewTicketContent';
import FileUpload from '../../common/ticket/FileUpload';

export default function UserNewTicketContainer() {
  const {
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
    setDueDate,
    setDueTime,
  } = useNewTicketStore();

  const onClickSubmit = () => {
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
        <TopMenu boldGrayText="티켓 생성" rightText="템플릿 리스트 / 템플릿 생성" linkTo="/user/templates" />

        <div className="flex flex-col bg-bg-1 p-6 gap-10 min-w-[600px]">
          <TicketPreview />
          <TicketOptions />
          <div className="flex flex-col gap-3 text-body-bold">
            <div className="flex gap-10 items-center">
              <p>마감 기한</p>
              <div className="flex itmes-center gap-3">
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
          <div className="flex w-full justify-center">
            <button onClick={onClickSubmit} className="h-full btn">
              티켓 생성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
