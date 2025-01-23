// 담당자 - 티켓 관리 대시보드 (전체)

import Input from '../../components/common/Input';
import TopMenu from '../../components/common/TopMenu';

export default function ManagerHome() {
  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1200">
        <TopMenu
          boldBlackText="Dashboard"
          boldGrayText="티켓 관리 대시보드"
          rightText="나의 티켓 관리 바로가기"
          linkTo="/manager/tickets"
        />
        <div className="flex flex-col gap-4">
          <Input element="input" size="lg" label="현재 비밀번호" placeholder="현재 비밀번호를 입력해주세요" />
          <Input element="input" size="sm" label="현재 비밀번호" placeholder="현재 비밀번호를 입력해주세요" />
          <Input element="textarea" size="sm" label="현재 비밀번호" placeholder="현재 비밀번호를 입력해주세요" />
        </div>
      </div>
    </div>
  );
}
