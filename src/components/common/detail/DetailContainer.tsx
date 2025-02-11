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
import TicketReview from './TicketReview';

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
      {ticket && (
        <StatusBar data={ticket} status={ticket?.status as 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'REVIEW' | 'REJECTED' | undefined} />
      )}
      <section className="flex bg-gray-18 p-6 pb-[38px] mt-3 mb-[100px]">
        <div className="flex gap-4 mr-10">
          <div className="mt-5">
            <Profile name={ticket?.managerName ? ticket?.managerName : 'undefined'} backgroundColor="USER" size="lg" />
          </div>
          <section className="w-[577px] flex flex-col">
            {ticket && <TicketContent data={ticket} />}
            <CommentInput />
            {comments?.data && comments?.data.length > 0 ? (
              [...comments.data]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((comment: Comment) => (
                  <CommentItem
                    key={comment.commentId}
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
          {ticket && ticket.status === 'REVIEW' && <TicketReview managerId={ticket?.managerId} />}
          {ticket && (
            <>
              <TicketDetail data={ticket} />
              {location.pathname.startsWith('/manager') && <TicketSetting data={ticket} />}
            </>
          )}
          {location.pathname.startsWith('/manager') && <TicketTask />}
          <TicketLog />
        </section>
      </section>
    </div>
  );
}
