declare interface LoginData {
  username: string;
  password: string;
}

declare interface LoginResponse {
  id: number;
  passwordChangeNeeded: boolean;
  role: 'MANAGER' | 'USER' | 'ADMIN' | 'DEFAULT';
}

declare interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
}

declare interface UserCountResponse {
  registrationCount: number;
  userCount: number;
}

declare interface UserListResponse {
  users: Array<{
    userId: number;
    username: string;
    email: string;
    role: string;
  }>;
  adminCount: number;
  managerCount: number;
  userCount: number;
}

declare interface UserDetailResponse {
  userId: number; // 'id'를 'userId'로 변경
  username: string;
  email: string;
  role: 'MANAGER' | 'USER' | 'ADMIN' | 'DEFAULT';
  profileImageUrl: string;
  department?: string; // 선택적 필드로 변경 (응답에 없으므로)
}

declare interface RoleChangeData {
  role: string;
}
