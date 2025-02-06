export type TicketViewType = '전체' | '대기중' | '진행중' | '검토 요청' | '완료' | '긴급';

export type TicketStatusType = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';

export interface TicketDataProps {
  ticketId: number;
  title: string;
  description: string;
  typeName: string; // 요청 유형
  firstCategoryName: string;
  secondCategoryName: string;
  managerName: string;
  status: TicketStatusType;
  urgent: boolean;
  deadline: string; // yyyy-MM-dd HH:mm
}

// API 응답 데이터 구조
export interface TicketListResponse {
  message: string;
  data: {
    content: TicketDataProps[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      totalPages: number;
      totalElements: number;
    };
  };
}
