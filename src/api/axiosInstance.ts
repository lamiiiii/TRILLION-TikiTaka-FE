import axios, {AxiosInstance} from 'axios';
import {tokenStorage} from '../utils/token';
import {postReissueToken} from './service/auth';

const config = {
  backend: {
    baseURL: process.env.REACT_APP_BASE_URL, // React 환경변수 사용
  },
};

const server = config.backend.baseURL;

const instance: AxiosInstance = axios.create({
  baseURL: server,
  withCredentials: true, // 쿠키를 포함한 인증 정보를 서버에 전송
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 재발급 요청이 중복되지 않도록 Promise 공유
let refreshTokenPromise: Promise<string | null> | null = null;

instance.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = ` ${token}`;
  }
  return config;
});

instance.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = ` ${token}`;
  }
  return config;
});

// 응답 인터셉터: 응답이 401 (토큰 만료)인 경우 자동으로 리프레시 토큰으로 액세스 토큰 재발급
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log('재발급 해줘요.');

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // 401 에러가 발생하고, 재시도가 이루어지지 않았을 경우
      originalRequest._retry = true;

      try {
        // ✅ 중복된 토큰 재발급 요청 방지
        if (!refreshTokenPromise) {
          refreshTokenPromise = postReissueToken()
            .then(({accessToken}) => {
              refreshTokenPromise = null;
              console.log('재발급합니다.');

              return accessToken;
            })
            .catch((err) => {
              refreshTokenPromise = null;
              throw err;
            });
        }

        // ✅ 토큰 발급 성공 시 기존 요청 다시 보내기
        const newAccessToken = await refreshTokenPromise;
        if (!newAccessToken) throw new Error('토큰 재발급 실패');

        originalRequest.headers.Authorization = `${newAccessToken}`;
        return instance(originalRequest);
      } catch (reissueError) {
        console.error('🚨 토큰 재발급 실패, 로그아웃 처리:', reissueError);
        tokenStorage.remove(); // 저장된 토큰 삭제
        window.location.href = '/'; // 로그인 페이지로 리디렉트
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
