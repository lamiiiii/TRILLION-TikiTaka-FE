import instance from '../axiosInstance';

// INTF-21: 티켓 폼 생성
export async function createTicketForm(firstCategoryId: number, secondCategoryId: number, formData: CreateTicketFormData) {
  try {
    const {data} = await instance.post(`/tickets/forms/${firstCategoryId}/${secondCategoryId}`, formData, {});
    return data;
  } catch (error) {
    console.error('티켓 폼 생성 실패:', error);
    throw error;
  }
}

// INTF-22: 티켓 폼 조회
export async function getTicketForm(firstCategoryId: number, secondCategoryId: number) {
  try {
    const {data} = await instance.get(`/tickets/forms/${firstCategoryId}/${secondCategoryId}`);
    return data.data; // 요청 양식이 있는 경우 반환
  } catch (error) {
    console.error('티켓 폼 조회 실패:', error);
    return null; // 요청 양식이 없는 경우 null 반환
  }
}

// INTF-23: 티켓 폼 수정
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

// INTF-24: 티켓 폼 삭제
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

// INTF-25: 티켓 유형 생성
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

// INTF-26: 티켓 유형 조회
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

// INTF-27: 티켓 유형 수정
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

// INTF-28: 티켓 유형 삭제
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

// INTF-29: 티켓 생성
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

// INTF-30: 티켓 상태별 개수 조회
export async function getTicketStatusCount() {
  try {
    const {data} = await instance.get<{message: string; data: TicketStatusCount}>('/tickets/count');
    return data.data;
  } catch (error) {
    console.error('티켓 상태 조회 실패:', error);
    throw error;
  }
}

// INTF-31: 티켓 상세 조회
export async function getTicketDetails(ticketId: number) {
  try {
    const {data} = await instance.get<{message: string; data: TicketDetails}>(`/tickets/${ticketId}`);
    return data.data;
  } catch (error) {
    console.error('티켓 상세 조회 실패:', error);
    throw error;
  }
}

// INTF-32: 티켓 승인 대기 조회
export async function getPendingApprovalCount(managerId: number) {
  try {
    const {data} = await instance.get<{message: string; data: PendingApprovalCount}>(`/tickets/list/pending?managerId=${managerId}`);
    return data.data;
  } catch (error) {
    console.error('승인 대기 티켓 조회 실패:', error);
    throw error;
  }
}

// INTF-34: 담당자 개인 티켓 조회
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
export async function getTicketList(params: TicketListParams = {}) {
  try {
    const {data} = await instance.get<{message: string; data: TicketListResponse}>('/tickets/list', {
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
export async function updateTicket(ticketId: number, params: UpdateTicketParams) {
  try {
    const {data} = await instance.patch(`/tickets/${ticketId}`, params);
    return data;
  } catch (error) {
    console.error('티켓 세부내용 수정 실패:', error);
    throw error;
  }
}

// INTF-37: 티켓 상태 수정
export async function updateTicketStatus(ticketId: number, status: string) {
  try {
    const {data} = await instance.patch(`/tickets/${ticketId}/status`, {status});
    return data;
  } catch (error) {
    console.error('티켓 상태 수정 실패:', error);
    throw error;
  }
}

// INTF-38: 티켓 우선순위 수정
export async function updateTicketPriority(ticketId: number, priority: string) {
  try {
    const {data} = await instance.patch(`/tickets/${ticketId}/priority`, {priority});
    return data;
  } catch (error) {
    console.error('티켓 우선순위 수정 실패:', error);
    throw error;
  }
}

// INTF-39: 티켓 담당자 수정
export async function updateTicketManager(ticketId: number, managerId: number) {
  try {
    const {data} = await instance.patch(`/tickets/manager/${ticketId}`, {managerId});
    return data;
  } catch (error) {
    console.error('티켓 담당자 수정 실패:', error);
    throw error;
  }
}

// INTF-40: 티켓 마감기한 수정
export async function updateTicketDeadline(ticketId: number, deadline: string) {
  try {
    const {data} = await instance.patch(`/tickets/deadline/${ticketId}`, {deadline});
    return data;
  } catch (error) {
    console.error('티켓 마감기한 수정 실패:', error);
    throw error;
  }
}

// INTF-41: 티켓 삭제
export async function deleteTicket(ticketId: number) {
  try {
    const {data} = await instance.delete(`/tickets/${ticketId}`);
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
export async function createTicketComment(ticketId: number, formData: FormData) {
  try {
    const {data} = await instance.post(`/tickets/${ticketId}/comments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    console.error('티켓 댓글 작성 실패:', error);
    throw error;
  }
}

// INTF-45: 티켓 댓글 조회
export async function getTicketComments(ticketId: number) {
  try {
    const {data} = await instance.get(`/tickets/${ticketId}/comments`);
    return data;
  } catch (error) {
    console.error('티켓 댓글 조회 실패:', error);
    throw error;
  }
}

// INTF-46: 티켓 댓글 수정
export async function updateTicketComment(ticketId: number, commentId: number, content: string) {
  try {
    const {data} = await instance.patch(`/tickets/${ticketId}/comments/${commentId}`, {content});
    return data;
  } catch (error) {
    console.error('티켓 댓글 수정 실패:', error);
    throw error;
  }
}

// INTF-47: 티켓 댓글 삭제
export async function deleteTicketComment(ticketId: number, commentId: number) {
  try {
    const {data} = await instance.delete(`/tickets/${ticketId}/comments/${commentId}`);
    return data;
  } catch (error) {
    console.error('티켓 댓글 삭제 실패:', error);
    throw error;
  }
}

// 티켓 승인 함수
export async function approveTicket(ticketId: number) {
  try {
    const {data} = await instance.patch(`/tickets/${ticketId}/approve`);
    return data;
  } catch (error) {
    console.error('티켓 승인 실패:', error);
    throw error;
  }
}

// 티켓 반려 함수
export async function rejectTicket(ticketId: number) {
  try {
    const {data} = await instance.patch(`/tickets/${ticketId}/reject`);
    return data;
  } catch (error) {
    console.error('티켓 반려 실패:', error);
    throw error;
  }
}

// // INTF-46: 티켓 댓글 수정 (PATCH)
// export async function updateTicketComment(ticketId: number, commentId: number, content: string) {
//   try {
//     const response = await fetch(`http://210.109.54.71:8080/tickets/${ticketId}/comments/${commentId}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWQiOjQsInVzZXJuYW1lIjoibWFuYWdlci50ayIsInJvbGUiOiJNQU5BR0VSIiwiaWF0IjoxNzM4NzY2Mzg4LCJleHAiOjE3Mzg3Njk5ODh9.-fUGrM4_Jabl4F2uDsi057Qchj97ShkD5w5R2akxqEDqNl_I8iTZlywzHG8adEfdMnM8kRj07VJq4dIVjIt5ZQ
// `,
//       },
//       credentials: 'include', // withCredentials: true 대체
//       body: JSON.stringify({content}),
//     });

//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     return await response.json();
//   } catch (error) {
//     console.error('티켓 댓글 수정 실패:', error);
//     throw error;
//   }
// }

// // INTF-47: 티켓 댓글 삭제 (DELETE)
// export async function deleteTicketComment(ticketId: number, commentId: number) {
//   try {
//     const response = await fetch(`http://210.109.54.71:8080/tickets/${ticketId}/comments/${commentId}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWQiOjQsInVzZXJuYW1lIjoibWFuYWdlci50ayIsInJvbGUiOiJNQU5BR0VSIiwiaWF0IjoxNzM4NzY2Mzg4LCJleHAiOjE3Mzg3Njk5ODh9.-fUGrM4_Jabl4F2uDsi057Qchj97ShkD5w5R2akxqEDqNl_I8iTZlywzHG8adEfdMnM8kRj07VJq4dIVjIt5ZQ
// `,
//       },
//       credentials: 'include',
//     });

//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     return await response.json(); // 서버가 응답 본문을 반환하지 않으면 .text() 사용
//   } catch (error) {
//     console.error('티켓 댓글 삭제 실패:', error);
//     throw error;
//   }
// }
