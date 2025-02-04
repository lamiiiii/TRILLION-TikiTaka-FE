import instance from '../axiosInstance';

// INTF-57: 티켓 템플릿 저장
interface CreateTemplateParams {
  templateTitle: string;
  title: string;
  description: string;
  typeId: number;
  firstCategoryId: number;
  secondCategoryId: number;
  requesterId: number;
  managerId?: number;
}

export async function createTicketTemplate(token: string, params: CreateTemplateParams) {
  try {
    const {data} = await instance.post('/ticketTemplates', params, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('템플릿 저장 실패:', error);
    throw error;
  }
}

// INTF-58: 템플릿 단일 조회
interface TemplateDetail {
  templateTitle: string;
  title: string;
  description: string;
  typeId: number;
  firstCategoryId: number;
  secondCategoryId: number;
  requesterId: number;
  managerId?: number;
  createdAt: string;
  updatedAt: string;
}

export async function getTicketTemplate(token: string, templateId: number) {
  try {
    const {data} = await instance.get<{message: string; data: TemplateDetail}>(`/ticketTemplates/${templateId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('템플릿 조회 실패:', error);
    throw error;
  }
}

// INTF-59: 템플릿 목록 조회
interface TemplateListItem {
  templateTitle: string;
  title: string;
  typeId: number;
  firstCategoryId: number;
  secondCategoryId: number;
  createdAt: string;
  updatedAt: string;
}

export async function getTicketTemplatesList(token: string) {
  try {
    const {data} = await instance.get<{message: string; data: TemplateListItem[]}>('/ticketTemplates', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('템플릿 목록 조회 실패:', error);
    throw error;
  }
}

// INTF-60: 템플릿 수정
interface UpdateTemplateParams extends CreateTemplateParams {
  updatedAt?: string;
}

export async function updateTicketTemplate(token: string, templateId: number, params: UpdateTemplateParams) {
  try {
    const {data} = await instance.patch(`/ticketTemplates/${templateId}`, params, {headers: {Authorization: `Bearer ${token}`}});
    return data;
  } catch (error) {
    console.error('템플릿 수정 실패:', error);
    throw error;
  }
}

// INTF-61: 템플릿 삭제
export async function deleteTicketTemplate(token: string, templateId: number) {
  try {
    const {data} = await instance.delete(`/ticketTemplates/${templateId}`, {headers: {Authorization: `Bearer ${token}`}});
    return data;
  } catch (error) {
    console.error('템플릿 삭제 실패:', error);
    throw error;
  }
}
