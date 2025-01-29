// props 관련 Interface
// -----------------------------

// 사이드바 메뉴 props
export interface MenuItemProps {
  icon: React.ComponentType<{strokeColor: string}>;
  text: string;
  to?: string;
  children?: React.ReactNode;
}

// Top Menu props
export interface TopMenuProps {
  boldBlackText?: string; // 좌측 요소 (검정색 bold)
  boldGrayText?: string; // 좌측 요소 (gray-12 bold)
  boldSmText?: string; // 좌측 요소 (gray-12 10px bold)
  regularText?: string; // 좌측 요소 (gray-12 regular)
  btnText?: string; // 좌측 요소
  onBtnClick?: () => void;
  rightText?: string;
  linkTo?: string;
}

// 아이콘 props
export interface IconProps {
  isActive?: boolean;
}

// 전역 변수 관련 Interface
// -----------------------------

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

// 기타 interface
// -----------------------------
export interface InquiryData {
  type: string;
  title: string;
  content: string;
  date: string;
  status: string;
}
