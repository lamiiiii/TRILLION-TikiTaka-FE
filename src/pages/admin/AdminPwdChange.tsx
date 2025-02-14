import AuthGuard from '../../components/common/AuthGuard';
import PwdChangeContainer from '../../components/common/PwdChangeContainer';
import TopMenu from '../../components/common/TopMenu';
import {useTokenStore, useUserStore} from '../../store/store';

export default function AdminPwdChange() {
  const {isAuthenticated} = useTokenStore();
  const {role} = useUserStore();

  return (
    <AuthGuard isAuthenticated={isAuthenticated} userRole={role}>
      <div className="top-container">
        <div className="flex flex-col max-w-1200">
          <TopMenu boldBlackText="비밀번호 변경" />
          <PwdChangeContainer />
        </div>
      </div>
    </AuthGuard>
  );
}
