import {PRIORITY} from '../constants/constants';

// 사용자 정보 store
export interface UserStore {
  role: 'manager' | 'user' | 'admin';
  setRole: (newRole: 'manager' | 'user' | 'admin') => void; // 역할 값의 타입을 정확히 제한
}
export interface TokenStore {
  accessToken: string;
  setAccessToken: (token: string) => void;
  isTokenSet: boolean;
  setIsTokenSet: (state: boolean) => void;
}

export interface TicketStore {
  priority: PriorityType;
  isReviewNeeded: boolean;
  setPriority: (priority: string) => void;
  setIsReviewNeeded: (isReviewRequired: boolean) => void;
}

// 기타 interface

export type PriorityType = (typeof PRIORITY)[number];

export interface InquiryData {
  type: string;
  title: string;
  content: string;
  date: string;
  status: string;
  answer?: {
    content: string;
  };
}
