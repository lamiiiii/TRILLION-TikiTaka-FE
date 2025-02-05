import axios, {AxiosInstance} from 'axios';

// FIX: base url 수정 필요 , 우선 back 로컬로 설정
const instance: AxiosInstance = axios.create({
  baseURL: 'http://210.109.54.71:8080',
  withCredentials: true, // 쿠키를 포함한 인증 정보를 서버에 전송
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWQiOjQsInVzZXJuYW1lIjoibWFuYWdlci50ayIsInJvbGUiOiJNQU5BR0VSIiwiaWF0IjoxNzM4NzY2Mzg4LCJleHAiOjE3Mzg3Njk5ODh9.-fUGrM4_Jabl4F2uDsi057Qchj97ShkD5w5R2akxqEDqNl_I8iTZlywzHG8adEfdMnM8kRj07VJq4dIVjIt5ZQ

    `,
  },
});

export default instance;
