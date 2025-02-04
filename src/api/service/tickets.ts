import instance from '../axiosInstance';

// 티켓 폼 생성 (INTF-21)
interface CreateTicketFormData {
  mustDescription: string;
  description: string;
}

export async function createTicketForm(token: string, firstCategoryId: number, secondCategoryId: number, formData: CreateTicketFormData) {
  try {
    const {data} = await instance.post(`/tickets/forms/${firstCategoryId}/${secondCategoryId}`, formData, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('티켓 폼 생성 실패:', error);
    throw error;
  }
}

// 티켓 폼 조회 (INTF-22)
export async function getTicketForm(token: string, firstCategoryId: number, secondCategoryId: number) {
  try {
    const {data} = await instance.get(`/tickets/forms/${firstCategoryId}/${secondCategoryId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('티켓 폼 조회 실패:', error);
    throw error;
  }
}

// 티켓 폼 수정 (INTF-23)
interface UpdateTicketFormData {
  description: string;
}

export async function updateTicketForm(token: string, firstCategoryId: number, secondCategoryId: number, formData: UpdateTicketFormData) {
  try {
    const {data} = await instance.patch(`/tickets/forms/${firstCategoryId}/${secondCategoryId}`, formData, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('티켓 폼 수정 실패:', error);
    throw error;
  }
}

// 티켓 폼 삭제 (INTF-24)
export async function deleteTicketForm(token: string, firstCategoryId: number, secondCategoryId: number) {
  try {
    const {data} = await instance.delete(`/tickets/forms/${firstCategoryId}/${secondCategoryId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('티켓 폼 삭제 실패:', error);
    throw error;
  }
}

// 티켓 유형 생성 (INTF-25)
interface CreateTicketTypeData {
  typeName: string;
}

export async function createTicketType(token: string, typeData: CreateTicketTypeData) {
  try {
    const {data} = await instance.post('/tickets/types', typeData, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('티켓 유형 생성 실패:', error);
    throw error;
  }
}

// 티켓 유형 조회 (INTF-26)
export async function getTicketTypes(token: string) {
  try {
    const {data} = await instance.get('/tickets/types/list', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('티켓 유형 조회 실패:', error);
    throw error;
  }
}

// 티켓 유형 수정 (INTF-27)
interface UpdateTicketTypeData {
  typeName: string;
}

export async function updateTicketType(token: string, typeId: number, typeData: UpdateTicketTypeData) {
  try {
    const {data} = await instance.patch(`/tickets/types/${typeId}`, typeData, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('티켓 유형 수정 실패:', error);
    throw error;
  }
}

// 티켓 유형 삭제 (INTF-28)
export async function deleteTicketType(token: string, typeId: number) {
  try {
    const {data} = await instance.delete(`/tickets/types/${typeId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('티켓 유형 삭제 실패:', error);
    throw error;
  }
}

// 티켓 생성 (INTF-29)
interface CreateTicketData {
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

export async function createTicket(token: string, ticketData: CreateTicketData) {
  try {
    const {data} = await instance.post('/tickets', ticketData, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('티켓 생성 실패:', error);
    throw error;
  }
}

// 티켓 상태별 개수 조회 (INTF-30)
interface TicketStatusCount {
  total: number;
  pending: number;
  inProgress: number;
  reviewing: number;
  completed: number;
  urgent: number;
}

export async function getTicketStatusCount(token: string) {
  try {
    const {data} = await instance.get<{message: string; data: TicketStatusCount}>('/tickets/count', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('티켓 상태 조회 실패:', error);
    throw error;
  }
}

// 티켓 상세 조회 (INTF-31)
interface TicketDetails {
  ticketId: number;
  title: string;
  description: string;
  priority: string | null;
  status: string;
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

export async function getTicketDetails(token: string, ticketId: number) {
  try {
    const {data} = await instance.get<{message: string; data: TicketDetails}>(`/tickets/${ticketId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('티켓 상세 조회 실패:', error);
    throw error;
  }
}

// INTF-32: 티켓 승인 대기 조회
interface PendingApprovalCount {
  totalPending: number;
  totalPendingUrgent: number;
}

export async function getPendingApprovalCount(token: string) {
  try {
    const {data} = await instance.get<{message: string; data: PendingApprovalCount}>('/tickets/list/my/pending', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('승인 대기 티켓 조회 실패:', error);
    throw error;
  }
}

// INTF-33: 대기 티켓 수 조회
interface PendingTicketCount {
  myPendingTicket: number;
  unassignedPendingTicket: number;
}

export async function getPendingTicketCount(token: string) {
  try {
    const {data} = await instance.get<{message: string; data: PendingTicketCount}>('/tickets/list/pending', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('대기 티켓 수 조회 실패:', error);
    throw error;
  }
}

// INTF-34: 담당자 개인 티켓 조회
interface PersonalTicketStatus {
  pendingTicket: number;
  processingTicket: number;
  doneTicket: number;
}

export async function getPersonalTicketStatus(token: string) {
  try {
    const {data} = await instance.get<{message: string; data: PersonalTicketStatus}>('/tickets/list/personal', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('개인 티켓 현황 조회 실패:', error);
    throw error;
  }
}

// INTF-35: 티켓 목록 조회
interface TicketListItem {
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

interface TicketListResponse {
  content: TicketListItem[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    // ... 기타 페이지네이션 필드
  };
  totalPages: number;
  totalElements: number;
}

interface TicketListParams {
  page?: number;
  size?: number;
  status?: string;
  firstCategoryId?: number;
  secondCategoryId?: number;
  ticketTypeId?: number;
  managerId?: number;
  requesterId?: number;
}

export async function getTicketList(token: string, params: TicketListParams = {}) {
  try {
    const {data} = await instance.get<{message: string; data: TicketListResponse}>('/tickets/list', {
      headers: {Authorization: `Bearer ${token}`},
      params: {
        page: params.page || 0,
        size: params.size || 20,
        status: params.status,
        firstCategoryId: params.firstCategoryId,
        secondCategoryId: params.secondCategoryId,
        ticketTypeId: params.ticketTypeId,
        managerId: params.managerId,
        requesterId: params.requesterId,
      },
    });
    return data.data;
  } catch (error) {
    console.error('티켓 목록 조회 실패:', error);
    throw error;
  }
}

// INTF-36: 티켓 세부내용 수정
interface UpdateTicketParams {
  title: string;
  description: string;
  urgent: boolean;
  typeId?: number;
  primaryCategoryId?: number;
  secondaryCategoryId?: number;
}

export async function updateTicket(token: string, ticketId: number, params: UpdateTicketParams) {
  try {
    const {data} = await instance.patch(`/tickets/${ticketId}`, params, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('티켓 세부내용 수정 실패:', error);
    throw error;
  }
}

// INTF-37: 티켓 상태 수정
export async function updateTicketStatus(token: string, ticketId: number, status: string) {
  try {
    const {data} = await instance.patch(
      `/tickets/status/${ticketId}`,
      {status},
      {
        headers: {Authorization: `Bearer ${token}`},
      }
    );
    return data;
  } catch (error) {
    console.error('티켓 상태 수정 실패:', error);
    throw error;
  }
}

// INTF-38: 티켓 우선순위 수정
export async function updateTicketPriority(token: string, ticketId: number, priority: string) {
  try {
    const {data} = await instance.patch(
      `/tickets/priority/${ticketId}`,
      {priority},
      {
        headers: {Authorization: `Bearer ${token}`},
      }
    );
    return data;
  } catch (error) {
    console.error('티켓 우선순위 수정 실패:', error);
    throw error;
  }
}

// INTF-39: 티켓 담당자 수정
export async function updateTicketManager(token: string, ticketId: number, managerId: number) {
  try {
    const {data} = await instance.patch(
      `/tickets/manager/${ticketId}`,
      {managerId},
      {
        headers: {Authorization: `Bearer ${token}`},
      }
    );
    return data;
  } catch (error) {
    console.error('티켓 담당자 수정 실패:', error);
    throw error;
  }
}

// INTF-40: 티켓 마감기한 수정
export async function updateTicketDeadline(token: string, ticketId: number, deadline: string) {
  try {
    const {data} = await instance.patch(
      `/tickets/deadline/${ticketId}`,
      {deadline},
      {
        headers: {Authorization: `Bearer ${token}`},
      }
    );
    return data;
  } catch (error) {
    console.error('티켓 마감기한 수정 실패:', error);
    throw error;
  }
}

// INTF-41: 티켓 삭제
export async function deleteTicket(token: string, ticketId: number) {
  try {
    const {data} = await instance.delete(`/tickets/${ticketId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('티켓 삭제 실패:', error);
    throw error;
  }
}

// INTF-42: 티켓 검토
export async function reviewTicket(token: string, ticketId: number) {
  try {
    const {data} = await instance.post(`/tickets/${ticketId}/reviews`, null, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('티켓 검토 실패:', error);
    throw error;
  }
}

// INTF-43: 티켓 검토 내역 조회
export async function getTicketReviews(token: string, ticketId: number) {
  try {
    const {data} = await instance.get(`/tickets/${ticketId}/reviews`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('티켓 검토 내역 조회 실패:', error);
    throw error;
  }
}

// INTF-44: 티켓 댓글 작성
export async function createTicketComment(token: string, ticketId: number, content: string) {
  try {
    const {data} = await instance.post(
      `/tickets/${ticketId}/comments`,
      {content},
      {
        headers: {Authorization: `Bearer ${token}`},
      }
    );
    return data;
  } catch (error) {
    console.error('티켓 댓글 작성 실패:', error);
    throw error;
  }
}

// INTF-45: 티켓 댓글 조회
export async function getTicketComments(token: string, ticketId: number) {
  try {
    const {data} = await instance.get(`/tickets/${ticketId}/comments`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('티켓 댓글 조회 실패:', error);
    throw error;
  }
}

// INTF-46: 티켓 댓글 수정
export async function updateTicketComment(token: string, ticketId: number, commentId: number, content: string) {
  try {
    const {data} = await instance.patch(
      `/tickets/${ticketId}/comments/${commentId}`,
      {content},
      {
        headers: {Authorization: `Bearer ${token}`},
      }
    );
    return data;
  } catch (error) {
    console.error('티켓 댓글 수정 실패:', error);
    throw error;
  }
}

// INTF-47: 티켓 댓글 삭제
export async function deleteTicketComment(token: string, ticketId: number, commentId: number) {
  try {
    const {data} = await instance.delete(`/tickets/${ticketId}/comments/${commentId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('티켓 댓글 삭제 실패:', error);
    throw error;
  }
}
