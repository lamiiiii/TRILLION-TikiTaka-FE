import instance from '../axiosInstance';

// INTF-1: POST: 계정 등록 신청
export async function postRegistration(postData: {email: string; username: string}) {
  const data = await instance.post('/registrations', postData);
  return data;
}

// INTF-2: GET: 계정 등록 신청 조회
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

// INTF-3: POST: 계정 등록 승인/거절
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
