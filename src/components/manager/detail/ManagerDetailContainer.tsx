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

export const CONTAINERIZATION_REQUEST =
  '저는 BE 1팀 홍길동입니다. 현재 저희 팀에서 마이크로서비스 기반 애플리케이션의 컨테이너화를 추진하려고 합니다. 이 과정에서 귀 팀의 전문적인 지원이 필요하여 요청드립니다. 요청 상세 내용: 1) 컨테이너화 환경 구축 - Docker 기반의 컨테이너 이미지 생성 및 배포를 위한 지원, Dockerfile 작성에 대한 검토 및 최적화 제안 2) 컨테이너 오케스트레이션 지원 - Kubernetes 클러스터 구성 및 서비스 배포 가이드, Helm Chart 또는 기타 배포 도구 설정 지원 3) 서비스 간 통신 네트워크 설정 - Docker Compose 또는 Kubernetes 네트워크 설정 검토, 각 마이크로서비스 간 통신 및 API Gateway 구성 4) 데이터베이스 컨테이너화 - 각 마이크로서비스에 적합한 데이터베이스 컨테이너 설정 저는 BE 1팀 홍길동입니다. 현재 저희 팀에서 마이크로서비스 기반 애플리케이션의 컨테이너화를 추진하려고 합니다. 이 과정에서 귀 팀의 전문적인 지원이 필요하여 요청드립니다. 요청 상세 내용: 1) 컨테이너화 환경 구축 - Docker 기반의 컨테이너 이미지 생성 및 배포를 위한 지원, Dockerfile 작성에 대한 검토 및 최적화 제안 2) 컨테이너 오케스트레이션 지원 - Kubernetes 클러스터 구성 및 서비스 배포 가이드, Helm Chart 또는 기타 배포 도구 설정 지원 3) 서비스 간 통신 네트워크 설정 - Docker Compose 또는 Kubernetes 네트워크 설정 검토, 각 마이크로서비스 간 통신 및 API Gateway 구성 4) 데이터베이스 컨테이너화 - 각 마이크로서비스에 적합한 데이터베이스 컨테이너 설정 저는 BE 1팀 홍길동입니다. 현재 저희 팀에서 마이크로서비스 기반 애플리케이션의 컨테이너화를 추진하려고 합니다. 이 과정에서 귀 팀의 전문적인 지원이 필요하여 요청드립니다. 요청 상세 내용: 1) 컨테이너화 환경 구축 - Docker 기반의 컨테이너 이미지 생성 및 배포를 위한 지원, Dockerfile 작성에 대한 검토 및 최적화 제안 2) 컨테이너 오케스트레이션 지원 - Kubernetes 클러스터 구성 및 서비스 배포 가이드, Helm Chart 또는 기타 배포 도구 설정 지원 3) 서비스 간 통신 네트워크 설정 - Docker Compose 또는 Kubernetes 네트워크 설정 검토, 각 마이크로서비스 간 통신 및 API Gateway 구성 4) 데이터베이스 컨테이너화 - 각 마이크로서비스에 적합한 데이터베이스 컨테이너 설정';

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
