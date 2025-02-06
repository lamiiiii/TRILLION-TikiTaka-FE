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
  typeName: string;
  firstCategoryName: string;
  secondCategoryName: string;
  managerName: string;
  requesterName: string;
  urgent: boolean;
  deadline: string; // yyyy-MM-dd HH:mm
  createdAt: string; // yyyy-MM-dd HH:mm
  updatedAt: string | null;
}

declare interface PendingApprovalCount {
  totalPending: number;
  totalPendingUrgent: number;
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
    // ... 기타 페이지네이션 필드
  };
  totalPages: number;
  totalElements: number;
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
