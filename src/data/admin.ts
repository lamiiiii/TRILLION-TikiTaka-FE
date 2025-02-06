// 📌 src/data/accountDummy.ts
export const accountDummy = [
  {id: 'david.han', name: 'han', affiliation: '인프라 엔지니어링 1팀', role: '담당자', status: '대기중'},
  {id: 'alex.kim', name: 'kim', affiliation: '소프트웨어 개발 2팀', role: '사용자', status: '승인'},
  {id: 'jane.lee', name: 'lee', affiliation: '데이터 엔지니어링 3팀', role: '담당자', status: '승인'},
  {id: 'ryan.choi', name: 'choi', affiliation: '클라우드 운영팀', role: '사용자', status: '대기중'},
  {id: 'mike.jung', name: 'jung', affiliation: '네트워크 지원팀', role: '담당자', status: '대기중'},
  {id: 'sofia.park', name: 'sofia', affiliation: '보안팀', role: '사용자', status: '대기중'},
  {id: 'jackson.kim', name: 'jackson', affiliation: '서버 운영팀', role: '담당자', status: '대기중'},
  {id: 'lisa.song', name: 'lisa', affiliation: 'DB 관리팀', role: '관리자', status: '대기중'},
  {id: 'mark.lee', name: 'mark', affiliation: '데이터 분석팀', role: '사용자', status: '대기중'},
  {id: 'emma.cho', name: 'emma', affiliation: 'IT 지원팀', role: '담당자', status: '대기중'},
  {id: 'daniel.park', name: 'daniel', affiliation: '네트워크팀', role: '담당자', status: '승인'},
  {id: 'hannah.lee', name: 'hannah', affiliation: '보안팀', role: '관리자', status: '승인'},
  {id: 'kevin.kang', name: 'kevin', affiliation: '클라우드 관리팀', role: '사용자', status: '승인'},
  {id: 'olivia.yoon', name: 'olivia', affiliation: '데이터 분석팀', role: '담당자', status: '승인'},
  {id: 'noah.choi', name: 'noah', affiliation: '서버 운영팀', role: '사용자', status: '승인'},
];

export const categoryDummy = [
  // 1차 카테고리 (parentId가 null)
  { id: 1, name: "Beyond Compute Service", parentId: null },
  { id: 2, name: "Beyond Networking Service", parentId: null },
  { id: 3, name: "Container Pack", parentId: null },

  // 2차 카테고리 (각 1차 카테고리의 id가 parentId로 들어감)
  { id: 101, name: "Virtual Machine", parentId: 1 },
  { id: 102, name: "Bare Metal Server", parentId: 1 },

  { id: 201, name: "VPC", parentId: 2 },
  { id: 202, name: "Load Balancing", parentId: 2 },

  { id: 301, name: "Kubernetes Engine", parentId: 3 },
  { id: 302, name: "Container Registry", parentId: 3 },
];



export const inquiryDummy = [
  {
    id: 1,
    user: '인프라 엔지니어링팀 김규리',
    type: '요청',
    title: '계정 권한 변경 요청',
    content:
      '현재 사용자를 그룹으로 지정하고 싶지만, 추가적인 관리 기능을 사용할 수 있는 권한이 부족합니다. 특정 프로젝트에 대한 관리 권한을 부여해 주실 수 있을까요?',
    date: '2025-02-05 15:00',
    status: '답변 등록',
  },
  {
    id: 2,
    user: '디자이너팀 곽서연',
    type: '질문',
    title: '티켓 확인이 안 됩니다.',
    content: "티켓을 생성 후 확인하고자 했는데, '티켓을 찾을 수 없습니다'라는 메시지가 뜹니다. 이 문제를 어떻게 해결할 수 있을까요?",
    date: '2025-02-05 15:00',
    status: '답변 등록',
  },
  {
    id: 3,
    user: '프론트엔드 개발팀 김낙도',
    type: '질문',
    title: '비밀번호 재설정 오류',
    content: '비밀번호 재설정을 시도했지만 인증 코드가 도착하지 않습니다. 해결 방법이 있을까요?',
    date: '2025-02-05 14:45',
    status: '답변 완료',
  },
  {
    id: 4,
    user: '인프라 엔지니어링팀 김규리',
    type: '요청',
    title: '사용자 계정 삭제 요청',
    content: '사용하지 않는 계정을 삭제하고 싶습니다. 계정 삭제 방법을 안내해 주실 수 있나요?',
    date: '2025-02-05 13:30',
    status: '답변 등록',
  },
  {
    id: 5,
    user: '디자이너팀 곽서연',
    type: '질문',
    title: '대시보드 통계가 업데이트되지 않습니다.',
    content: '관리자 페이지에서 실시간 통계 데이터가 반영되지 않고, 캐시된 데이터만 표시됩니다. 원인을 확인해주실 수 있을까요?',
    date: '2025-02-04 14:30',
    status: '답변 완료',
  },
  {
    id: 6,
    user: '프론트엔드 개발팀 김낙도',
    type: '요청',
    title: '서비스 이용 관련 문의',
    content: '최근 서비스 이용 중 특정 기능이 정상적으로 작동하지 않는 것 같습니다. 원인을 확인해 주실 수 있을까요?',
    date: '2025-02-03 10:45',
    status: '답변 등록',
  },
  {
    id: 7,
    user: '인프라 엔지니어링팀 김규리',
    type: '질문',
    title: '이메일 인증이 되지 않습니다.',
    content: '회원가입 시 이메일 인증 링크를 클릭해도 인증이 완료되지 않습니다. 해결 방법이 있을까요?',
    date: '2025-02-02 18:20',
    status: '답변 완료',
  },
  {
    id: 8,
    user: '디자이너팀 곽서연',
    type: '요청',
    title: '새로운 기능 추가 요청',
    content: '사용자 활동 로그를 확인할 수 있는 기능을 추가해 주실 수 있을까요?',
    date: '2025-02-02 16:10',
    status: '답변 등록',
  },
  {
    id: 9,
    user: '프론트엔드 개발팀 김낙도',
    type: '요청',
    title: '모바일에서 UI가 깨집니다.',
    content: '모바일 환경에서 특정 페이지 UI가 정상적으로 표시되지 않습니다. 확인 부탁드립니다.',
    date: '2025-02-01 21:55',
    status: '답변 등록',
  },
  {
    id: 10,
    user: '프론트엔드 개발팀 김낙도',
    type: '질문',
    title: '서비스 속도 저하 문제',
    content: '최근 서비스 이용 시 속도가 느려졌습니다. 최적화가 필요할 것 같습니다.',
    date: '2025-02-01 15:30',
    status: '답변 완료',
  },
];
