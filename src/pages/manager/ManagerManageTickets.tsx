import AuthGuard from '../../components/common/AuthGuard';
import ManagerManageContainer from '../../components/manager/ManagerManageContainer';
import {useTokenStore} from '../../store/store';

export default function ManagerManageTickets() {
  const {isAuthenticated} = useTokenStore();

  return (
    <AuthGuard isAuthenticated={isAuthenticated}>
      <ManagerManageContainer />
    </AuthGuard>
  );
}
