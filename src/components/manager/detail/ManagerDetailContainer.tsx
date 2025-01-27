import {useNavigate} from 'react-router-dom';
import TopMenu from '../../common/TopMenu';
import StatusBar from './StatusBar';

export default function ManagerDetailContainer() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col pt-[30px] px-[46px]">
      <button onClick={handleGoBack} className="text-body-regular text-gray-16 text-left">
        {'< 뒤로가기'}
      </button>
      <TopMenu boldBlackText="#113" regularText="[요청] 마이크로서비스 기반의 애플리케이션 컨테이너화" />
      <StatusBar priority="HIGH" status="진행 중" />
    </div>
  );
}
