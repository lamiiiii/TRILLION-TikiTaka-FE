import {tokenStorage} from '../../utils/token';
import instance from '../axiosInstance';

// INTF-4: 로그인
export async function postLogin(loginData: LoginData) {
  try {
    const existingToken = tokenStorage.get();
    if (existingToken) {
      tokenStorage.remove(); // 기존 토큰을 지움
    }

    const response = await instance.post<{message: string; data: LoginResponse}>('/login', loginData);
    const {data, headers} = response;
    const accessToken = headers['authorization'] || headers['Authorization'];
    if (accessToken) tokenStorage.set(accessToken); // 세션 스토리지에 저장
    console.log(accessToken);
    console.log(response);
    return {...data, accessToken};
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
}

// INTF-5: 로그아웃
export async function postLogout() {
  try {
    console.log('로그아웃 해주세요.');

    const token = tokenStorage.get();
    if (!token) throw new Error('로그인 정보가 없습니다.');

    await instance.post('/logout', null, {
      headers: {Authorization: `${token}`},
    });
    tokenStorage.remove(); // 로그아웃 시 토큰 삭제
    console.log('로그아웃했습니다.');
  } catch (error) {
    console.error('로그아웃 오류:', error);
    throw error;
  }
}

// INTF-6: 토큰 재발급
export async function postReissueToken() {
  try {
    const {headers} = await instance.post('/reissue', null);
    // 새로운 accessToken 가져오기
    let newAccessToken = headers['authorization'] || headers['Authorization'];
    if (newAccessToken?.startsWith('Bearer ')) {
      newAccessToken = newAccessToken.replace('');
    }

    if (newAccessToken) {
      tokenStorage.set(newAccessToken); // 새로운 accessToken 저장
    }

    return {accessToken: newAccessToken};
  } catch (error) {
    console.error('토큰 재발급 실패:', error);
    throw error;
  }
}
