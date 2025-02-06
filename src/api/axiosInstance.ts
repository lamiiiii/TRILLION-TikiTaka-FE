import axios, {AxiosInstance} from 'axios';

// FIX: base url 수정 필요 , 우선 back 로컬로 설정
const instance: AxiosInstance = axios.create({
  baseURL: 'http://210.109.54.71:8080',
  withCredentials: false, // 쿠키를 포함한 인증 정보를 서버에 전송
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWQiOjQsInVzZXJuYW1lIjoibWFuYWdlci50ayIsInJvbGUiOiJNQU5BR0VSIiwiaWF0IjoxNzM4ODE4NjE4LCJleHAiOjE3Mzg4MjIyMTh9.EOU7VBj071rkJqkYge0Dyhw_SFyp-AfoJls9duE-Xl39z_UzU6rmGb5WK1-3LPFGHRbfpRTkYCnzKnbizUkTeA

`,
  },
});

export default instance;
