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
import {useQuery} from '@tanstack/react-query';
import {getTicketComments, getTicketDetails} from '../../../api/service/tickets';
import {Comment} from '../../../interfaces/interfaces';
import {TicketDetails} from '../../../api/type/tickets';

export default function DetailContainer() {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();

  // 뒤로 가기
  const handleGoBack = () => navigate(-1);

  // URL 파라미터에서 추출한 ID
  const ticketId = Number(id);

  // 티켓 상세 정보 조회
  const {data: ticket} = useQuery<TicketDetails>({
    queryKey: ['ticketDetails', ticketId],
    queryFn: () => getTicketDetails(ticketId),
  });

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

      <TopMenu boldBlackText={`#${ticket?.ticketId}`} regularText={ticket?.title} />
      <StatusBar status={ticket?.status as 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'REVIEW' | 'REJECTED' | undefined} />

      <section className="flex bg-gray-18 p-6 pb-[38px] mt-3 mb-[100px]">
        <div className="flex gap-4 mr-10">
          <Profile name={ticket?.managerName ? ticket?.managerName : 'undefined'} backgroundColor="user" size="lg" />
          <section className="w-[577px] flex flex-col">
            <TicketContent content={ticket?.description} />
            <CommentInput />
            {comments?.data && comments?.data.length > 0 ? (
              comments?.data.map((comment: Comment) => (
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
          {ticket && (
            <>
              <TicketDetail data={ticket} />
              <TicketSetting data={ticket} />
            </>
          )}
          {location.pathname.startsWith('/manager') && <TicketTask />}
          <TicketLog />
        </section>
      </section>
    </div>
  );
}
