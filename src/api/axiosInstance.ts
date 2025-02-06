import axios, {AxiosInstance} from 'axios';

// FIX: base url 수정 필요 , 우선 back 로컬로 설정
const instance: AxiosInstance = axios.create({
  baseURL: 'http://210.109.54.71:8080',
  withCredentials: false, // 쿠키를 포함한 인증 정보를 서버에 전송
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWQiOjQsInVzZXJuYW1lIjoibWFuYWdlci50ayIsInJvbGUiOiJNQU5BR0VSIiwiaWF0IjoxNzM4ODI2OTM1LCJleHAiOjE3Mzg4MzA1MzV9.ryD0cWh7JuxLU9Vy99abzwszDzvnTbCtmipFh7XCj8MZQnm0FiEAzTTS_xFej45nsRXXUPBrNT3bV9iilUeQ0w

`,
  },
});

export default instance;
