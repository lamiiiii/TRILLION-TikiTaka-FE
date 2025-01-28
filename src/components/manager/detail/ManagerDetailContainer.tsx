import {useNavigate} from 'react-router-dom';
import TopMenu from '../../common/TopMenu';
import StatusBar from './StatusBar';
import TicketContent from './TicketContent';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import Profile from '../../common/Profile';
import TicketDetail from './TicketDetail';
import TicketSetting from './TicketSetting';
import TicketTask from './TicketTask';
import {CONTAINERIZATION_REQUEST} from '../../../constants/constants';

export default function ManagerDetailContainer() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col pt-[30px] px-[46px] ">
      <button onClick={handleGoBack} className="text-body-regular text-gray-16 text-left">
        {'< 뒤로가기'}
      </button>

      <TopMenu boldBlackText="#113" regularText="[요청] 마이크로서비스 기반의 애플리케이션 컨테이너화" />
      <StatusBar priority="HIGH" status="진행 중" />

      <section className="flex bg-gray-18 p-6 pb-[38px] mt-3 mb-[100px]">
        <div className="flex gap-4 mr-10">
          <Profile name="honggildong" backgroundColor="user" size="lg" />
          <section className="w-[577px] flex flex-col">
            <TicketContent content={CONTAINERIZATION_REQUEST} />
            <CommentInput />
            <CommentItem name="Yeon" content="댓글 내용" />
          </section>
        </div>

        <section className="flex flex-col gap-5 w-full">
          <TicketDetail />
          <TicketSetting />
          <TicketTask />
        </section>
      </section>
    </div>
  );
}
