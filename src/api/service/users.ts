import instance from '../axiosInstance';

// INTF-4: 로그인
export async function postLogin(loginData: LoginData) {
  try {
    const {data, headers} = await instance.post<{message: string; data: LoginResponse}>('/login', loginData);
    const accessToken = headers['authorization'];
    const refreshToken = headers['set-cookie']?.find((cookie) => cookie.startsWith('refresh='));
    return {...data, accessToken, refreshToken};
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
}

// INTF-5: 로그아웃
export async function postLogout(token: string) {
  try {
    const {data} = await instance.post('/logout', null, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
}

// INTF-6: 토큰 재발급
export async function postReissueToken(refreshToken: string) {
  try {
    const {headers} = await instance.post('/reissue', null, {
      headers: {Cookie: refreshToken},
    });
    return {
      accessToken: headers['authorization'],
      refreshToken: headers['set-cookie']?.find((cookie) => cookie.startsWith('refresh=')),
    };
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    throw error;
  }
}

// INTF-7: 비밀번호 변경
export async function patchUserPassword(token: string, passwordData: PasswordChangeData) {
  try {
    const {data} = await instance.patch('/users/password', passwordData, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('비밀번호 변경 실패:', error);
    throw error;
  }
}

// INTF-12: 계정 삭제
export async function patchDeleteUser(token: string, userId: number) {
  try {
    const {data} = await instance.patch(`/users/${userId}`, null, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('계정 삭제 실패:', error);
    throw error;
  }
}

// INTF-13: 등록 대기 및 등록된 사용자 수 조회
export async function getUserCount(token: string) {
  try {
    const {data} = await instance.get<{message: string; data: UserCountResponse}>('/users/count', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('사용자 수 조회 실패:', error);
    throw error;
  }
}

// INTF-14: 시스템 사용자 목록 조회
export async function getUserList(token: string) {
  try {
    const {data} = await instance.get<{message: string; data: UserListResponse}>('/users', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('사용자 목록 조회 실패:', error);
    throw error;
  }
}

// INTF-15: 시스템 사용자 기본 정보 조회
export async function getUserDetail(token: string, userId: number) {
  try {
    const {data} = await instance.get<{message: string; data: UserDetailResponse}>(`/users/${userId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data.data;
  } catch (error) {
    console.error('사용자 상세 정보 조회 실패:', error);
    throw error;
  }
}

// INTF-16: 시스템 사용자 역할 변경
export async function patchUserRole(token: string, userId: number, roleData: RoleChangeData) {
  try {
    const {data} = await instance.patch(`/users/${userId}/role`, roleData, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    console.error('사용자 역할 변경 실패:', error);
    throw error;
  }
}
