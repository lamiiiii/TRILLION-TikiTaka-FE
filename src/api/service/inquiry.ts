import instance from '../axiosInstance'; // 기존 Axios 인스턴스 불러오기

// 문의사항 타입 정의
export interface Inquiry {
  inquiryId: number;
  requesterId: number;
  requesterName: string;
  type: 'QUESTION' | 'REQUEST';
  title: string;
  content: string;
  answer: string;
  status: boolean;
  createdAt: string; // yyyy-MM-dd hh:mm:ss
  updatedAt: string; // yyyy-MM-dd hh:mm:ss
}

// API 응답 타입 정의
export interface InquiriesResponse {
  message: string;
  data: Inquiry[];
}

export const getInquiries = async (page: number = 0, size: number = 20): Promise<Inquiry[]> => {
  try {
    const response = await instance.get<{message: string; data: {content: Inquiry[]}}>('/inquiries', {
      params: {page, size},
    });

    // ✅ API 응답이 배열인지 확인 후 반환
    if (!response.data || !response.data.data || !Array.isArray(response.data.data.content)) {
      console.error('API 응답 형식이 올바르지 않습니다:', response.data);
      return [];
    }

    return response.data.data.content; // 🚀 `content` 배열 반환
  } catch (error) {
    console.error('문의사항 목록 조회 실패:', error);
    return []; // 🚨 오류 발생 시 빈 배열 반환
  }
};

// 답변 작성 요청 타입 정의
//interface AnswerRequest {
//answer: string;
//}

// API 응답 타입 정의
interface ApiResponse {
  message: string;
  data: null;
}

// 문의사항 답변 작성 API 함수
export const submitAnswer = async (inquiryId: number, answer: string): Promise<ApiResponse> => {
  try {
    const response = await instance.patch<ApiResponse>(`/inquiries/${inquiryId}/answer`, {answer});

    return response.data;
  } catch (error) {
    console.error('문의사항 답변 작성 실패:', error);
    throw error;
  }
};

// 문의사항 작성 요청 타입 정의
interface CreateInquiryRequest {
  title: string;
  content: string;
  type: 'QUESTION' | 'REQUEST';
}

// API 응답 타입 정의
interface ApiResponse {
  message: string;
  data: null;
}

// 문의사항 작성 API 함수
export const createInquiry = async (inquiryData: CreateInquiryRequest): Promise<ApiResponse> => {
  try {
    const response = await instance.post<ApiResponse>('/inquiries', inquiryData);

    return response.data;
  } catch (error) {
    console.error('문의사항 작성 실패:', error);
    throw error;
  }
};
