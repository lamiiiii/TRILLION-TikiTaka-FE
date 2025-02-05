import axios, {AxiosInstance} from 'axios';

// FIX: base url 수정 필요 , 우선 back 로컬로 설정
const instance: AxiosInstance = axios.create({
  baseURL: 'http://210.109.54.71:8080',
  withCredentials: true, // 쿠키를 포함한 인증 정보를 서버에 전송
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWQiOjQsInVzZXJuYW1lIjoibWFuYWdlci50ayIsInJvbGUiOiJNQU5BR0VSIiwiaWF0IjoxNzM4NzU4NjY3LCJleHAiOjE3Mzg3NjIyNjd9.tO0stH0bOPuUngxE_k4W64qCHCK_bhug2_jA9c18s8mRL5xFwT46p14pAONdAkfL0UTdRge5ldOmJkFU2_-b3Q
    `,
  },
});

export default instance;
