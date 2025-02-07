import AuthGuard from '../../components/common/AuthGuard';
import NewTicketContainer from '../../components/common/ticket/NewTicketContainer';
import {useTokenStore} from '../../store/store';

export default function ManagerNewTicket() {
  const {isAuthenticated} = useTokenStore();

  return (
    <AuthGuard isAuthenticated = {isAuthenticated}>
      <NewTicketContainer />
    </AuthGuard>
  );
}
