declare interface CreateTicketFormData {
  mustDescription: string;
  description: string;
}

declare interface UpdateTicketFormData {
  description: string;
}

declare interface CreateTicketTypeData {
  typeName: string;
}

declare interface UpdateTicketTypeData {
  typeName: string;
}

declare interface CreateTicketData {
  title?: string;
  description?: string;
  urgent: boolean;
  type_id: number;
  primary_category_id: number;
  secondary_category_id?: number;
  deadline: string; // yyyy-MM-dd HH:mm
  requester_id: number;
  manager_id?: number;
  status: string;
}

declare interface TicketStatusCount {
  total: number;
  pending: number;
  inProgress: number;
  reviewing: number;
  completed: number;
  urgent: number;
}

declare interface TicketDetails {
  ticketId: number;
  title: string;
  description: string;
  priority: string | null;
  status: keyof typeof STATUS_MAP;
  typeId: number;
  typeName: string;
  firstCategoryId: number;
  firstCategoryName: string;
  secondCategoryId: number;
  secondCategoryName: string;
  managerId: number;
  managerName: string;
  requesterId: number;
  requesterName: string;
  urgent: boolean;
  deadline: string; // yyyy-MM-dd HH:mm
  createdAt: string; // yyyy-MM-dd HH:mm
  updatedAt: string; // yyyy-MM-dd HH:mm
  attachments: any[]; // 첨부 파일 정보를 위한 배열
}

declare interface PendingApprovalCount {
  myPendingTicket: number;
  unassignedPendingTicket: number;
  totalPendingTicket: number;
  urgentPendingTicket: number;
}

declare interface PendingTicketCount {
  myPendingTicket: number;
  unassignedPendingTicket: number;
}

declare interface PersonalTicketStatus {
  pendingTicket: number;
  processingTicket: number;
  doneTicket: number;
}

declare interface TicketListItem {
  ticketId: number;
  title: string;
  description: string;
  typeName: string;
  firstCategoryName: string;
  secondCategoryName: string;
  managerName: string;
  status: string;
  urgent: boolean;
  deadline: string;
}

declare interface TicketListResponse {
  content: TicketListItem[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

declare interface TicketListParams {
  page?: number;
  size?: number;
  status?: string;
  firstCategoryId?: number;
  secondCategoryId?: number;
  ticketTypeId?: number;
  managerId?: number;
  requesterId?: number;
}

declare interface UpdateTicketParams {
  title: string;
  description: string;
  urgent: boolean;
  typeId?: number;
  primaryCategoryId?: number;
  secondaryCategoryId?: number;
}
