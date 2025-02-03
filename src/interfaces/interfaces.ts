import {PRIORITY} from '../constants/constants';
import {Category} from './newTicket';

// 사용자 정보
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

export interface CategoryStore {
  categories: Category[];
  setCategories: (categories: Category[]) => void;

  // addCategory: (category: Category) => void;
  // updateCategory: (id: number, name: string) => void;
  // removeCategory: (id: number) => void;
}

export interface NewTicketStore {
  isUrgent: boolean;
  firstCategory: Category | null;
  secondCategory: Category | null;
  title: string;
  content: string;
  manager: string;
  ticketType: string;
  template: string;
  dueDate: string;
  dueTime: string;
  setIsUrgent: (isUrgent: boolean) => void;
  setFirstCategory: (category: Category | null) => void;
  setSecondCategory: (category: Category | null) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setManager: (manager: string) => void;
  setTicketType: (ticketType: string) => void;
  setTemplate: (template: string) => void;
  setDueDate: (date: string) => void;
  setDueTime: (time: string) => void;
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

export interface UserInfo {
  name: string;
  email: string;
  role: 'manager' | 'user' | 'admin';
  website: string;
}
