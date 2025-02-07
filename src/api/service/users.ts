import instance from '../axiosInstance';

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

// 담당자 목록 조회
export async function getManagerList() {
  try {
    const {data} = await instance.get<{message: string; data: UserListResponse}>('/users?role=MANAGER', {});
    return data.data;
  } catch (error) {
    console.error('사용자 목록 조회 실패:', error);
    throw error;
  }
}

// INTF-14: 시스템 사용자 목록 조회
export async function getUserList() {
  try {
    const {data} = await instance.get<{message: string; data: UserListResponse}>('/users', {});
    return data.data;
  } catch (error) {
    console.error('사용자 목록 조회 실패:', error);
    throw error;
  }
}

// INTF-15: 시스템 사용자 기본 정보 조회
export async function getUserDetail(userId: number) {
  try {
    // 토큰을 따로 전달할 필요 없이, 인스턴스가 인터셉터를 통해 자동으로 헤더에 토큰을 추가
    const {data} = await instance.get<{message: string; data: UserDetailResponse}>(`/users/${userId}`);
    return data.data;
  } catch (error) {
    console.error('사용자 상세 정보 조회 실패:', error);
    throw error;
  }
}

// 사용자 본인 정보 조회
export async function getUserInfo() {
  try {
    // 토큰을 따로 전달할 필요 없이, 인스턴스가 인터셉터를 통해 자동으로 헤더에 토큰을 추가
    const {data} = await instance.get<{message: string; data: UserDetailResponse}>(`/users/me`);
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
