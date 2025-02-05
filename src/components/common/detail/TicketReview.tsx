import {CheckIcon} from '../Icon';
import Profile from '../Profile';

// 임시 데이터
const reviewers = [
  {name: 'Yeon', reviewed: true, reviewDate: '2025.02.06'},
  {name: 'John', reviewed: false},
  {name: 'Alex', reviewed: true, reviewDate: '2025.02.07'},
];

export default function TicketReview() {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-body-bold">검토 현황</label>
      <div className="w-full p-5 border border-gray-2 rounded-[4px] bg-white text-subtitle-regular text-gray-15">
        <ul className="flex flex-col gap-[7px]">
          {reviewers.map((reviewer, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Profile name={reviewer.name} backgroundColor="manager" size="md" />
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
