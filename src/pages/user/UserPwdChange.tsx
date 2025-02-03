import PwdChangeContainer from '../../components/common/PwdChangeContainer';
import TopMenu from '../../components/common/TopMenu';

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
