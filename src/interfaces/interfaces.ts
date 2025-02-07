import {PRIORITY} from '../constants/constants';

// 사용자 정보
export interface UserStore {
  userId: number; // 사용자 아이디
  userName: string;
  setUserId: (id: number) => void;
  setUserName: (userName: string) => void;
  role: 'MANAGER' | 'USER' | 'ADMIN';
  setRole: (newRole: 'MANAGER' | 'USER' | 'ADMIN') => void; // 역할 값의 타입을 정확히 제한
}

export interface TokenStore {
  isAuthenticated: boolean;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  login: (accessToken: string) => void;
  logout: () => void;
}

export interface TicketStore {
  priority: PriorityType;
  setPriority: (priority: string) => void;
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
  manager: UserListResponse['users'][number] | null;
  ticketType: {typeId: number; typeName: string};
  template: {
    templateTitle: string;
    title: string;
    description: string;
    typeId: number;
    firstCategoryId?: number;
    secondCategoryId?: number;
    managerId?: number;
  };
  dueDate: string;
  dueTime: string;

  setIsUrgent: (isUrgent: boolean) => void;
  setFirstCategory: (category: Category | null) => void;
  setSecondCategory: (category: Category | null) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setManager: (manager: UserListResponse['users'][number] | null) => void;
  setTicketType: (ticketType: {typeId: number; typeName: string}) => void;
  setTemplate: (template: TemplateListItem) => void;
  setDueDate: (date: string) => void;
  setDueTime: (time: string) => void;

  firstCategoryId: number;
  secondCategoryId: number;
  managerId: number;
  setFirstCategoryId: (id: number) => void;
  setSecondCategoryId: (id: number) => void;
  setManagerId: (id: number) => void;
}

export interface TemplateStore {
  templateTitle: string;
  firstCategory: Category | null;
  secondCategory: Category | null;
  title: string;
  content: string;
  manager: UserListResponse['users'][number] | null;
  ticketType: {typeId: number; typeName: string};
  setTemplateTitle: (templateTitle: string) => void;
  setFirstCategory: (category: Category | null) => void;
  setSecondCategory: (category: Category | null) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setManager: (manager: UserListResponse['users'][number] | null) => void;
  setTicketType: (ticketType: {typeId: number; typeName: string}) => void;
}

export interface NewTicketFormStore {
  mustDescription: string;
  description: string;
  setMustDescription: (mustDescription: string) => void;
  setDescription: (description: string) => void;
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

// 댓글 응답 형식
export interface Comment {
  commentId: number;
  authorId: number;
  authorName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
