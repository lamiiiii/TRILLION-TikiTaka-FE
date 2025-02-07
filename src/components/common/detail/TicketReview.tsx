import {useParams} from 'react-router-dom';
import {CheckIcon} from '../Icon';
import Profile from '../Profile';
import {getTicketReviews} from '../../../api/service/tickets';
import {useQuery} from '@tanstack/react-query';

export default function TicketReview() {
  const {id} = useParams();
  const ticketId = Number(id);

  // 검토 내역 데이터 조회
  const {
    data: reviewers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['ticketReviews', ticketId],
    queryFn: () => getTicketReviews(ticketId),
    select: (data) => data.reviews, // 필요한 데이터만 추출
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>검토 내역을 불러오는 데 실패했습니다.</p>;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-body-bold">검토 현황</label>
      <div className="w-full p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15">
        <ul className="flex flex-col gap-[7px]">
          {reviewers.map((reviewer: any, index: number) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Profile name={reviewer.name} backgroundColor="MANAGER" size="md" />
                <div className="flex flex-col ml-2">
                  <span>{reviewer.name}</span>
                  {reviewer.reviewed && <span className="text-caption-regular">{reviewer.reviewDate} 검토 완료</span>}
                </div>
              </div>
              {reviewer.reviewed ? <CheckIcon /> : <button className="main-btn">검토</button>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
