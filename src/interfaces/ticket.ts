export type TicketViewType = '전체' | '대기중' | '진행중' | '검토 요청' | '완료' | '긴급';

export type TicketStatusType = '대기' | '진행중' | '완료' | '반려';

export interface TicketDataProps {
  id: string;
  category: string;
  subCategory: string;
  title: string;
  content: string;
  deadline: string;
  assignee: string;
  assigneeOptions: string[];
  isUrgent: boolean;
}

// 컴포넌트 Props 인터페이스
export interface TicketProps extends TicketDataProps {
  onAssigneeChange: (value: string) => void;
  onApprove: () => void;
  onReject: () => void;
}
