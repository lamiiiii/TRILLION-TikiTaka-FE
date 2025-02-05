import {useNavigate, useParams} from 'react-router-dom';
import TopMenu from '../TopMenu';
import StatusBar from './StatusBar';
import TicketContent from './TicketContent';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import Profile from '../Profile';
import TicketDetail from './TicketDetail';
import TicketSetting from './TicketSetting';
import TicketTask from './TicketTask';
import TicketLog from './TicketLog';
import {ticketDummy} from '../../../data/ticketData';
import {useQuery} from '@tanstack/react-query';
import {getTicketComments} from '../../../api/service/tickets';
import {Comment} from '../../../interfaces/interfaces';

export default function DetailContainer() {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();

  // URL의 ID와 일치하는 티켓 찾기
  const ticket = ticketDummy.find((ticket) => ticket.id === id);
  if (!ticket) {
    return <div className="text-center py-8">티켓을 찾을 수 없습니다</div>;
  }

  const handleGoBack = () => navigate(-1);

  // URL 파라미터에서 추출한 ID
  const ticketId = Number(id);

  //댓글 조회
  const {data: comments} = useQuery({
    queryKey: ['ticketComments', ticketId],
    queryFn: () => getTicketComments(ticketId),
  });

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
            {comments && comments.length > 0 ? (
              comments.map((comment: Comment) => (
                <CommentItem
                  commentId={comment.commentId}
                  name={comment.authorName}
                  content={comment.content}
                  createdAt={comment.createdAt}
                />
              ))
            ) : (
              <></>
            )}
          </section>
        </div>

        <section className="flex flex-col gap-5 w-[400px]">
          {/* {isReviewNeeded && <TicketReview />} */}
          <TicketDetail data={ticket} />
          <TicketSetting data={ticket} />
          {location.pathname.startsWith('/manager') && <TicketTask />}
          <TicketLog />
        </section>
      </section>
    </div>
  );
}
