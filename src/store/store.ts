import {create} from 'zustand';
import {tokenStorage} from '../utils/token';
import {NewTicketFormStore, NewTicketStore, TemplateStore, TicketStore, TokenStore, UserStore} from '../interfaces/interfaces';

// 시스템 사용자 정보 저장 전역변수
export const useUserStore = create<UserStore>((set) => ({
  userName: '',
  userId: -1,
  role: 'DEFAULT',

  setUserName: (userName) => set({userName}),
  setUserId: (userId) => set({userId}),
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

export const useNewTicketStore = create<NewTicketStore>((set) => ({
  isUrgent: false,
  firstCategory: null,
  secondCategory: null,
  title: '',
  content: '',
  manager: null,
  ticketType: {typeId: 0, typeName: ''},
  template: null,
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

  firstCategoryId: 0,
  secondCategoryId: 0,
  managerId: 0,
  templateId: 0,
  setFirstCategoryId: (firstCategoryId) => set({firstCategoryId: firstCategoryId}),
  setSecondCategoryId: (secondCategoryId) => set({secondCategoryId: secondCategoryId}),
  setManagerId: (managerId) => set({managerId: managerId}),
  setTemplateId: (templateId) => set({templateId: templateId}),

  isEditing: false,
  setIsEditing: (isEditing) => set({isEditing}),
}));

export const useTemplateStore = create<TemplateStore>((set) => ({
  templateTitle: '',
  firstCategory: null,
  secondCategory: null,
  title: '',
  content: '',
  manager: null,
  ticketType: {typeId: 0, typeName: ''},
  setTemplateTitle: (templateTitle) => set({templateTitle: templateTitle}),
  setFirstCategory: (category) => set({firstCategory: category}),
  setSecondCategory: (category) => set({secondCategory: category}),
  setTitle: (title) => set({title: title}),
  setContent: (content) => set({content: content}),
  setManager: (manager) => set({manager}),
  setTicketType: (ticketType) => set({ticketType}),

  firstCategoryId: 0,
  secondCategoryId: 0,
  managerId: 0,
  setFirstCategoryId: (firstCategoryId) => set({firstCategoryId: firstCategoryId}),
  setSecondCategoryId: (secondCategoryId) => set({secondCategoryId: secondCategoryId}),
  setManagerId: (managerId) => set({managerId: managerId}),
}));

export const useNewTicketFormStore = create<NewTicketFormStore>((set) => ({
  mustDescription: '',
  setMustDescription: (mustDescription) => set({mustDescription: mustDescription}),
  description: '',
  setDescription: (description) => set({description}),
}));
