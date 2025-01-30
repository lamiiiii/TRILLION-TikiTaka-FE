import TopMenu from '../../components/common/TopMenu';
import PwdChangeContainer from '../../components/manager/PwdChangeContainer';

export default function UserPwdChange() {
  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200">
        <TopMenu boldBlackText="비밀번호 변경" />
        <PwdChangeContainer />
      </div>
    </div>
  );
}
