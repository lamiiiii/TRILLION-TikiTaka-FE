export const STATUS_OPTIONS = ['대기 중', '진행 중', '진행 완료'];

export const PRIORITY = ['HIGH', 'MEDIUM', 'LOW'];

export const CONTAINERIZATION_REQUEST =
  '저는 BE 1팀 홍길동입니다. 현재 저희 팀에서 마이크로서비스 기반 애플리케이션의 컨테이너화를 추진하려고 합니다. 이 과정에서 귀 팀의 전문적인 지원이 필요하여 요청드립니다. 요청 상세 내용: 1) 컨테이너화 환경 구축 - Docker 기반의 컨테이너 이미지 생성 및 배포를 위한 지원, Dockerfile 작성에 대한 검토 및 최적화 제안 2) 컨테이너 오케스트레이션 지원 - Kubernetes 클러스터 구성 및 서비스 배포 가이드, Helm Chart 또는 기타 배포 도구 설정 지원 3) 서비스 간 통신 네트워크 설정 - Docker Compose 또는 Kubernetes 네트워크 설정 검토, 각 마이크로서비스 간 통신 및 API Gateway 구성 4) 데이터베이스 컨테이너화 - 각 마이크로서비스에 적합한 데이터베이스 컨테이너 설정 저는 BE 1팀 홍길동입니다. 현재 저희 팀에서 마이크로서비스 기반 애플리케이션의 컨테이너화를 추진하려고 합니다. 이 과정에서 귀 팀의 전문적인 지원이 필요하여 요청드립니다. 요청 상세 내용: 1) 컨테이너화 환경 구축 - Docker 기반의 컨테이너 이미지 생성 및 배포를 위한 지원, Dockerfile 작성에 대한 검토 및 최적화 제안 2) 컨테이너 오케스트레이션 지원 - Kubernetes 클러스터 구성 및 서비스 배포 가이드, Helm Chart 또는 기타 배포 도구 설정 지원 3) 서비스 간 통신 네트워크 설정 - Docker Compose 또는 Kubernetes 네트워크 설정 검토, 각 마이크로서비스 간 통신 및 API Gateway 구성 4) 데이터베이스 컨테이너화 - 각 마이크로서비스에 적합한 데이터베이스 컨테이너 설정 저는 BE 1팀 홍길동입니다. 현재 저희 팀에서 마이크로서비스 기반 애플리케이션의 컨테이너화를 추진하려고 합니다. 이 과정에서 귀 팀의 전문적인 지원이 필요하여 요청드립니다. 요청 상세 내용: 1) 컨테이너화 환경 구축 - Docker 기반의 컨테이너 이미지 생성 및 배포를 위한 지원, Dockerfile 작성에 대한 검토 및 최적화 제안 2) 컨테이너 오케스트레이션 지원 - Kubernetes 클러스터 구성 및 서비스 배포 가이드, Helm Chart 또는 기타 배포 도구 설정 지원 3) 서비스 간 통신 네트워크 설정 - Docker Compose 또는 Kubernetes 네트워크 설정 검토, 각 마이크로서비스 간 통신 및 API Gateway 구성 4) 데이터베이스 컨테이너화 - 각 마이크로서비스에 적합한 데이터베이스 컨테이너 설정';

// 문의 임시 데이터
export const INQUIRY_DATA = [
  {
    type: '요청',
    title: '계정 변환 변경 요청',
    content:
      '현재 사용자로 로그인되어 있지만, 추가적인 관리 기능을 사용할 수 있는 권한이 부족합니다. 특정 프로젝트에 대한 관리 권한을 부여해 주실 수 있을까요? ',
    date: '2025-02-05',
    status: '답변 대기',
  },
  {
    type: '요청',
    title: '계정 변환 변경 요청',
    content:
      '현재 사용자로 로그인되어 있지만, 추가적인 관리 기능을 사용할 수 있는 권한이 부족합니다. 특정 프로젝트에 대한 관리 권한을 부여해 주실 수 있을까요? ',
    date: '2025-02-05',
    status: '답변 완료',
    answer: {
      content: '안녕하세요. 요청하신 관리 권한이 부여되었습니다. 추가 문의사항이 있으시면 언제든 연락 주시기 바랍니다.',
    },
  },
];
