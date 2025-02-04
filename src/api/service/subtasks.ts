import instance from '../axiosInstance';

// INTF-51: 하위태스크 생성
interface CreateSubtaskParams {
  ticketId: number;
  description: string;
}

export async function createSubtask(token: string, params: CreateSubtaskParams) {
  try {
    const {data} = await instance.post('/subtasks', params, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('하위태스크 생성 실패:', error);
    throw error;
  }
}

// INTF-52: 하위태스크 조회
interface SubtaskItem {
  subtaskId: number;
  parentId: number;
  description: string;
  done: boolean;
}

export async function getSubtasks(token: string, ticketId: number) {
  try {
    const {data} = await instance.get<{message: string; data: SubtaskItem[]}>(`/subtasks/${ticketId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('하위태스크 조회 실패:', error);
    throw error;
  }
}

// INTF-53: 하위태스크 수정
interface UpdateSubtaskParams {
  description: string;
  ticketId?: number;
}

export async function updateSubtaskDescription(token: string, taskId: number, params: UpdateSubtaskParams) {
  try {
    const {data} = await instance.patch(`/subtasks/${taskId}`, params, {headers: {Authorization: `Bearer ${token}`}});
    return data;
  } catch (error) {
    console.error('하위태스크 수정 실패:', error);
    throw error;
  }
}

// INTF-54: 하위태스크 삭제
export async function deleteSubtask(token: string, taskId: number) {
  try {
    const {data} = await instance.delete(`/subtasks/${taskId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('하위태스크 삭제 실패:', error);
    throw error;
  }
}

// INTF-55: 하위태스크 상태 변경
export async function updateSubtaskStatus(token: string, ticketId: number, taskId: number, checked: boolean) {
  try {
    const {data} = await instance.patch(`/tickets/${ticketId}/tasks/${taskId}`, null, {
      headers: {Authorization: `Bearer ${token}`},
      params: {checked},
    });
    return data;
  } catch (error) {
    console.error('하위태스크 상태 변경 실패:', error);
    throw error;
  }
}

// INTF-56: 진행률 조회
interface ProgressResponse {
  progress: number;
}

export async function getTicketProgress(token: string, ticketId: number) {
  try {
    const {data} = await instance.get<{message: string; data: ProgressResponse}>(`/tickets/${ticketId}/progress`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data.progress;
  } catch (error) {
    console.error('진행률 조회 실패:', error);
    throw error;
  }
}
