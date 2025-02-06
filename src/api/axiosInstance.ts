import axios, {AxiosInstance} from 'axios';



// FIX: base url 수정 필요 , 우선 back 로컬로 설정
const instance: AxiosInstance = axios.create({
  baseURL: 'http://210.109.54.71:8080',
  withCredentials: true, // 쿠키를 포함한 인증 정보를 서버에 전송
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4udGsiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3Mzg4MjU3NTYsImV4cCI6MTczODgyOTM1Nn0.nUE3e2qwbMOxifNM63l2MGBHa_TtiNrxWkglY2dOKGIe-dFpLiooi6sU7WUY2baB6vYtzPKWR3bZTeEoodIGQQ

`,
  },
});

export default instance;
