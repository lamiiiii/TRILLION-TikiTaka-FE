import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import NewTicketContainer from '../../components/common/ticket/NewTicketContainer';
import {useTokenStore} from '../../store/store';

export default function ManagerNewTicket() {
  const {isAuthenticated} = useTokenStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/'); // 로그인 페이지로 이동
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null; // 로그인 안 된 경우 아무것도 렌더링하지 않음

  return <NewTicketContainer />;
}
