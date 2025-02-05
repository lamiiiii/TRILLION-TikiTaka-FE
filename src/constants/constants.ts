export const STATUS_OPTIONS = ['대기 중', '진행 중', '진행 완료'];

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
