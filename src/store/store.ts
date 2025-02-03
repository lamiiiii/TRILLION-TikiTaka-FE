// store.js

import {create} from 'zustand'; // create로 zustand를 불러옵니다.
import {TicketStore, TokenStore, UserStore} from '../interfaces/interfaces';

// 역할 임시 전달 - user, manager, admin (추후 로그인시 전달 받아와서 저장)
// 시스템 사용자 정보 저장 전역변수
export const useUserStore = create<UserStore>((set) => ({
  role: 'admin',
  setRole: (role) => set({role}),
}));

// 토큰 저장 전역변수
export const useTokenStore = create<TokenStore>((set) => ({
  accessToken: '',
  setAccessToken: (token) => set({accessToken: token}),
  isTokenSet: false,
  setIsTokenSet: (state) => set({isTokenSet: state}),
}));

export const useTicketStore = create<TicketStore>((set) => ({
  priority: 'HIGH',
  isReviewNeeded: false,
  setPriority: (priority: string) => set((state) => ({...state, priority})),
  setIsReviewNeeded: (state) => set({isReviewNeeded: state}),
}));
