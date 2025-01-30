import {EditIcon} from '../../common/Icon';
import Profile from '../../common/Profile';

export default function TicketAnalytics() {
  return (
    <div className="flex items-center gap-6 w-full bg-gray-18 p-5">
      <Profile name="Yeon" size="lg" backgroundColor="manager" />
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2">
          <p>Yeon</p>
          <EditIcon />
        </div>
        <p className="text-body-regular">yeonii@gmail.com</p>
        <p className="text-body-regular">https://www.kakaowork.com/</p>
      </div>
    </div>
  );
}
