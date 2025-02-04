import instance from '../axiosInstance';

// POST: 계정 등록 신청 (INTF-1)
export async function postRegistration(postData: {email: string; username: string}) {
  try {
    const {data} = await instance.post('/registrations', postData);
    return data;
  } catch (error) {
    console.error('계정 등록 실패:', error);
    throw error;
  }
}

// GET: 계정 등록 신청 조회 (INTF-2)
interface RegistrationListParams {
  page?: number;
  size?: number;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  token: string;
}

export async function getRegistrationList(params: RegistrationListParams) {
  try {
    const {data} = await instance.get('/registrations/list', {
      params: {
        page: params.page || 0,
        size: params.size || 20,
        status: params.status,
      },
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });
    return data;
  } catch (error) {
    console.error('신청 목록 조회 실패:', error);
    throw error;
  }
}

// POST: 계정 등록 승인/거절 (INTF-3)
interface RegistrationUpdateParams {
  registrationId: number;
  status: 'APPROVED' | 'REJECTED';
  role: 'ADMIN' | 'MANAGER' | 'USER';
  token: string;
}

export async function updateRegistrationStatus(params: RegistrationUpdateParams) {
  try {
    const {data} = await instance.post(
      `/registrations/${params.registrationId}?status=${params.status}&role=${params.role}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error('상태 업데이트 실패:', error);
    throw error;
  }
}
