import axios, {AxiosInstance} from 'axios';

// FIX: base url 수정 필요 , 우선 back 로컬로 설정
const instance: AxiosInstance = axios.create({
  baseURL: 'http://210.109.54.71:8080',
  withCredentials: true, // 쿠키를 포함한 인증 정보를 서버에 전송
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWQiOjQsInVzZXJuYW1lIjoibWFuYWdlci50ayIsInJvbGUiOiJNQU5BR0VSIiwiaWF0IjoxNzM4ODE0OTY1LCJleHAiOjE3Mzg4MTg1NjV9.9BH4jVE-XwruAL4R_gGmPCShMMtf90fF8B3EHQ4dVnQG6VGCdtPtL3Hm3ev4lQv3eWU_2CUWsUrKWK3jWRp49w

`,
  },
});

export default instance;
