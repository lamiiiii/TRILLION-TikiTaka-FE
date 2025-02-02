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
  { id: 1, primary: "Beyond Compute Service", secondary: "Virtual Machine", isRegistered: false },
  { id: 2, primary: "Beyond Compute Service", secondary: "Bare Metal Server", isRegistered: false },
  { id: 3, primary: "Beyond Compute Service", secondary: "GPU", isRegistered: true },
  { id: 4, primary: "Beyond Networking Service", secondary: "VPC", isRegistered: false },
  { id: 5, primary: "Beyond Networking Service", secondary: "Load Balancing", isRegistered: false },
  { id: 6, primary: "Beyond Networking Service", secondary: "CDN", isRegistered: false },
  { id: 7, primary: "Beyond Networking Service", secondary: "DNS", isRegistered: true },
  { id: 8, primary: "Beyond Networking Service", secondary: "Transit Gateway", isRegistered: false },
  { id: 9, primary: "Container Pack", secondary: "Kubernetes Engine", isRegistered: false },
  { id: 10, primary: "Container Pack", secondary: "Container Registry", isRegistered: true },
];

