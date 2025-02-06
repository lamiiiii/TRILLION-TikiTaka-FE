import axios, {AxiosInstance} from 'axios';

// FIX: base url 수정 필요 , 우선 back 로컬로 설정
const instance: AxiosInstance = axios.create({
  baseURL: 'http://210.109.54.71:8080',
  withCredentials: true, // 쿠키를 포함한 인증 정보를 서버에 전송
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWQiOjQsInVzZXJuYW1lIjoibWFuYWdlci50ayIsInJvbGUiOiJNQU5BR0VSIiwiaWF0IjoxNzM4ODA2MDU2LCJleHAiOjE3Mzg4MDYzNTZ9._GQPBlYOIqPjN0qlG3Ll0Y1_nxtFuMv5UP8F4jbW7LB-8oik488azVLKpcSLIO7-QFtWwcyhNd-3lgBztRIPFg

`,
  },
});

export default instance;
