import {useNavigate, useParams} from 'react-router-dom';
import TopMenu from '../../common/TopMenu';
import StatusBar from './StatusBar';
import TicketContent from './TicketContent';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import Profile from '../../common/Profile';
import TicketDetail from './TicketDetail';
import TicketSetting from './TicketSetting';
import TicketTask from './TicketTask';
import TicketReview from './TicketReview';
import {useTicketStore} from '../../../store/store';
import TicketLog from './TicketLog';
import {ticketDummy} from '../../../data/ticketData';

export default function ManagerDetailContainer() {
  const {id} = useParams<{id: string}>();
  const {isReviewNeeded} = useTicketStore();
  const navigate = useNavigate();

  // URL의 ID와 일치하는 티켓 찾기
  const ticket = ticketDummy.find((ticket) => ticket.id === id);
  if (!ticket) {
    return <div className="text-center py-8">티켓을 찾을 수 없습니다</div>;
  }

  const handleGoBack = () => navigate(-1);

  return (
    <div className="flex flex-col pt-[30px] px-[46px] ">
      <button onClick={handleGoBack} className="text-body-regular text-gray-16 text-left">
        {'< 뒤로가기'}
      </button>

      <TopMenu boldBlackText={`#${ticket.id}`} regularText={ticket.title} />
      {/* FIX: 상태 연결 필요 */}
      <StatusBar status="진행 중" />

      <section className="flex bg-gray-18 p-6 pb-[38px] mt-3 mb-[100px]">
        <div className="flex gap-4 mr-10">
          <Profile name={ticket.assignee} backgroundColor="user" size="lg" />
          <section className="w-[577px] flex flex-col">
            <TicketContent content={ticket?.content} />
            <CommentInput />
            {/* FIX: 댓글 데이터 연결 필요 */}
            <CommentItem name="Yeon" content="댓글 내용" />
          </section>
        </div>

        <section className="flex flex-col gap-5 w-[400px]">
          {isReviewNeeded && <TicketReview />}
          <TicketDetail data={ticket} />
          <TicketSetting />
          <TicketTask />
          <TicketLog />
        </section>
      </section>
    </div>
  );
}
