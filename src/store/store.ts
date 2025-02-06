// store.js

import {create} from 'zustand'; // create로 zustand를 불러옵니다.
import {tokenStorage} from '../utils/token';
import {CategoryStore, NewTicketStore, TicketStore, TokenStore, UserStore} from '../interfaces/interfaces';

// 역할 임시 전달 - user, manager, admin (추후 로그인시 전달 받아와서 저장)
// 시스템 사용자 정보 저장 전역변수
export const useUserStore = create<UserStore>((set) => ({
  userId: -1,
  setUserId: (userId) => set({userId}),
  role: 'USER',
  setRole: (role) => set({role}),
}));

// 토큰 저장 전역변수
export const useTokenStore = create<TokenStore>((set) => ({
  isAuthenticated: !!tokenStorage.get(),
  accessToken: '',
  setAccessToken: () => {
    set({accessToken: ''});
  },
  login: () => {
    set({isAuthenticated: true});
  },
  logout: () => {
    set({isAuthenticated: false});
  },
}));

export const useTicketStore = create<TicketStore>((set) => ({
  priority: 'HIGH',
  setPriority: (priority: string) => set((state) => ({...state, priority})),
}));

// 카테고리
export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({categories}),
}));

export const useNewTicketStore = create<NewTicketStore>((set) => ({
  isUrgent: false,
  firstCategory: null,
  secondCategory: null,
  title: '',
  content: '',
  manager: '',
  ticketType: {typeId: 0, typeName: ''},
  template: '',
  dueDate: '',
  dueTime: '',
  setIsUrgent: (isUrgent) => set({isUrgent}),
  setFirstCategory: (category) => set({firstCategory: category}),
  setSecondCategory: (category) => set({secondCategory: category}),
  setTitle: (title) => set({title: title}),
  setContent: (content) => set({content: content}),
  setManager: (manager) => set({manager}),
  setTicketType: (ticketType) => set({ticketType}),
  setTemplate: (template) => set({template}),
  setDueDate: (date) => set({dueDate: date}),
  setDueTime: (time) => set({dueTime: time}),
}));
