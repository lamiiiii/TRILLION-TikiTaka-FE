import axios, {AxiosInstance} from 'axios';

// FIX: base url 수정 필요 , 우선 back 로컬로 설정
const instance: AxiosInstance = axios.create({
  baseURL: 'http://210.109.54.71:8080',
  withCredentials: true, // 쿠키를 포함한 인증 정보를 서버에 전송
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwiaWQiOjQsInVzZXJuYW1lIjoibWFuYWdlci50ayIsInJvbGUiOiJNQU5BR0VSIiwiaWF0IjoxNzM4ODA4NDY4LCJleHAiOjE3Mzg4MTIwNjh9.J_sFYAR8-kOSIRDY3yv5h6HxONfSVwbES8XKh_pmoivqYUMuGx4RKs391mBRtW58ORUR0AanML7g_4CY4vWTyw

`,
  },
});

export default instance;
