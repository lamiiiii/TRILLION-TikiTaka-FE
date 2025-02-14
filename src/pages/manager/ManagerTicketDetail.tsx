import AuthGuard from '../../components/common/AuthGuard';
import DetailContainer from '../../components/common/detail/DetailContainer';
import {useTokenStore, useUserStore} from '../../store/store';

export default function ManagerTicketDetail() {
  const {isAuthenticated} = useTokenStore();
  const {role} = useUserStore();

  return (
    <AuthGuard isAuthenticated={isAuthenticated} userRole={role}>
      <div className="top-container ">
        <div className="flex flex-col">
          <DetailContainer />
        </div>
      </div>
    </AuthGuard>
  );
}
