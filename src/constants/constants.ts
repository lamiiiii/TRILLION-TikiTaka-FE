export const STATUS_MAP = {
  PENDING: '대기 중',
  IN_PROGRESS: '진행 중',
  REVIEW: '검토',
  DONE: '진행 완료',
  REJECTED: '반려',
};

export const STATUS_OPTIONS = Object.values(STATUS_MAP);

export const TICKET_STATUS = {
  WAITING: '대기 중',
  IN_PROGRESS: '진행 중',
  COMPLETED: '진행 완료',
} as const;
export type TicketStatus = (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS];

export const PRIORITY = ['HIGH', 'MEDIUM', 'LOW'];
export const PRIORITY_COLOR: {[key in (typeof PRIORITY)[number]]: string} = {
  HIGH: '#F24949',
  MEDIUM: '#F4B540',
  LOW: '#93CF1A',
};

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

export const ROLE = ['사용자', '담당자', '관리자'];

export const PRIMARY_CATEGORIES = ['인프라', '시스템', '네트워크', '공통 플랫폼'];

export const SECONDARY_CATEGORIES = {
  인프라: ['Virtual machine', 'Bare metal server', 'Gpu', 'Object Storage', 'Media Convert', 'File Storage'],
  시스템: [
    'Kubernetes Engine',
    'Container Registry',
    'MySQL',
    'PostgreSQL',
    'MemStore',
    'IAM',
    'Monitoring',
    'Alert Center',
    'Cloud Trail',
    'Monitoring Flow',
    'Advanced Managed Premetheus',
  ],
  네트워크: ['VPC', 'Load balancing', 'CDN', 'DNS', 'Transit Gateway'],
  '공통 플랫폼': [
    'OSS Library',
    'Hadoop Eco',
    'Data Catalog',
    'Data Query',
    'Pub/Sub',
    'Advanced Managed Kafka',
    'Kubeflow',
    'Hybrid Data Center',
  ],
};

export const TICKET_TYPES = ['생성', '조회', '수정', '삭제', '오류', '기타'];
