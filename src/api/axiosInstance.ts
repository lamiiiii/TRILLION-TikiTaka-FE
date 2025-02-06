import axios, {AxiosInstance} from 'axios';

// FIX: base url 수정 필요 , 우선 back 로컬로 설정
const instance: AxiosInstance = axios.create({
  baseURL: 'http://210.109.54.71:8080',
  withCredentials: true, // 쿠키를 포함한 인증 정보를 서버에 전송
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWQiOjQsInVzZXJuYW1lIjoibWFuYWdlci50ayIsInJvbGUiOiJNQU5BR0VSIiwiaWF0IjoxNzM4ODA0NjQ2LCJleHAiOjE3Mzg4MDQ5NDZ9.8oPWEAb-5kyBSrnYypwZycR1-zjZrDF9qoenTEdljMfpJMtJj3_dxgmuskMv_hVvuG7EswMj3tRzKw43ar72Wg

`,
  },
});

export default instance;
