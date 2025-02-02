// 📌 src/data/accountDummy.ts
export const accountDummy = [
  {
    id: "david.han",
    name: "han",
    department: "인프라 엔지니어링",
    affiliation: "인프라 엔지니어링 1팀",
    role: "담당자",
    status: "대기중", // ✅ 대기중
  },
  {
    id: "alex.kim",
    name: "kim",
    department: "소프트웨어 개발",
    affiliation: "소프트웨어 개발 2팀",
    role: "사용자",
    status: "승인", // ✅ 승인된 상태
  },
  {
    id: "jojo.park",
    name: "park",
    department: "보안",
    affiliation: "보안팀",
    role: "관리자",
    status: "거절", // ✅ 거절된 상태
  },
  {
    id: "jane.lee",
    name: "lee",
    department: "데이터 엔지니어링",
    affiliation: "데이터 엔지니어링 3팀",
    role: "담당자",
    status: "승인",
  },
  {
    id: "ryan.choi",
    name: "choi",
    department: "클라우드 운영",
    affiliation: "클라우드 운영팀",
    role: "사용자",
    status: "대기중",
  },
  {
    id: "mike.jung",
    name: "jung",
    department: "네트워크",
    affiliation: "네트워크 지원팀",
    role: "담당자",
    status: "거절",
  },
  {
    id: "susan.park",
    name: "park",
    department: "시스템 엔지니어링",
    affiliation: "시스템 운영팀",
    role: "사용자",
    status: "승인",
  },
  {
    id: "tom.kang",
    name: "kang",
    department: "보안",
    affiliation: "보안팀",
    role: "관리자",
    status: "대기중",
  },
];

export const categoryDummy = [
  { id: 1, primary: "Beyond Compute Service", secondary: "Virtual Machine", isRegistered: false, requestForm: null },
  { id: 2, primary: "Beyond Compute Service", secondary: "Bare Metal Server", isRegistered: false, requestForm: null },
  { 
    id: 3, 
    primary: "Beyond Compute Service", 
    secondary: "GPU", 
    isRegistered: true, 
    requestForm: {
      title: "Beyond Compute Service/GPU 요청 양식",
      requiredFields: "GPU 요청 사양: VRAM, 코어 수 등",
      description: "GPU 요청 개요: 머신러닝 모델 훈련, 3D 렌더링 등"
    }
  },
  { id: 4, primary: "Beyond Networking Service", secondary: "VPC", isRegistered: false, requestForm: null },
  { id: 5, primary: "Beyond Networking Service", secondary: "Load Balancing", isRegistered: false, requestForm: null },
  { id: 6, primary: "Beyond Networking Service", secondary: "CDN", isRegistered: false, requestForm: null },
  { 
    id: 7, 
    primary: "Beyond Networking Service", 
    secondary: "DNS", 
    isRegistered: true, 
    requestForm: {
      title: "Beyond Networking Service/DNS 요청 양식",
      requiredFields: "서비스 유형: DNS, 네트워크 구성 등",
      description: `
      **Beyond Networking Service/DNS 요청 항목**
      - 서비스 용도: [DNS 네트워크 구성/업데이트]
      - 요청 관련 정보: [현재 서비스 도메인, 필요 네트워크 구성]
      - 요청 사유/목적: [트래픽 분산 목적, API 기반 DNS 업데이트 요청]

      **서비스 사양 정보**
      - 신청 서비스 도메인 이름: (예: example.com)
      - 현재 운영 중인 환경: [현재 사용 중인 DNS 레코드 및 네트워크 구성]
      - 요청 내용 상세: [새로운 구성 추가 혹은 수정 설명]
      - 제한 사항 또는 고려사항: [특별한 유의해야 할 점]
      `
    }
  },
  { id: 8, primary: "Beyond Networking Service", secondary: "Transit Gateway", isRegistered: false, requestForm: null },
  { id: 9, primary: "Container Pack", secondary: "Kubernetes Engine", isRegistered: false, requestForm: null },
  { 
    id: 10, 
    primary: "Container Pack", 
    secondary: "Container Registry", 
    isRegistered: true, 
    requestForm: {
      title: "Container Pack/Container Registry 요청 양식",
      requiredFields: "레지스트리 유형: 프라이빗/퍼블릭",
      description: "컨테이너 이미지 관리 및 저장소 요청"
    }
  }
];

