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
    });
    return data;
  } catch (error) {
    console.error('신청 목록 조회 실패:', error);
    throw error;
  }
}

export async function updateRegistrationStatus(params: RegistrationUpdateParams) {
  try {
    const {data} = await instance.post(
      `/registrations/${params.registrationId}?status=${params.status}`, // ✅ status만 query로 보내기
      {
        role: params.role,
        reason: params.reason // ✅ role을 Body로 이동
      }
    );
    return data;
  } catch (error) {
    console.error('상태 업데이트 실패:', error);
    throw error;
  }
}
