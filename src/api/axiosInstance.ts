import axios, {AxiosInstance} from 'axios';
import {tokenStorage} from '../utils/token';
import {postReissueToken} from './service/auth';

export const config = {
  backend: {
    baseURL: process.env.REACT_APP_BASE_URL,
  },
};

const server = config.backend.baseURL;

const instance: AxiosInstance = axios.create({
  baseURL: server,
  withCredentials: false, // 일반 전송시에는 쿠키값을 보내면 안됨.
});

// 토큰 재발급 요청이 중복되지 않도록 Promise 공유
let refreshTokenPromise: Promise<string | null> | null = null;

// 요청 인터셉터: Authorization 헤더에 액세스 토큰 추가
instance.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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

    if (!error.response) {
      alert('서버와 연결할 수 없습니다. 네트워크 상태를 확인해주세요.');
      return Promise.reject(error);
    }

    const {status} = error.response;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        config;
        if (!refreshTokenPromise) {
          refreshTokenPromise = postReissueToken()
            .then(({accessToken}) => {
              refreshTokenPromise = null;

              return accessToken;
            })
            .catch((err) => {
              refreshTokenPromise = null;

              throw err;
            });
        }

        // 토큰 발급 성공 시 기존 요청 다시 보내기
        const newAccessToken = await refreshTokenPromise;
        if (!newAccessToken) throw new Error('토큰 재발급 실패');

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (reissueError) {
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        tokenStorage.remove(); // 저장된 토큰 삭제
        window.location.href = '/';
        return Promise.reject(reissueError);
      }
    }
    if (status === 403) {
      alert('이 페이지에 접근할 권한이 없습니다.');
      tokenStorage.remove();
      window.location.href = '/';
      return Promise.reject(error);
    }

    if (status === 419) {
      alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      tokenStorage.remove();
      window.location.href = '/';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default instance;
