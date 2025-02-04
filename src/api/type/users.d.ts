declare interface LoginData {
  username: string;
  password: string;
}

declare interface LoginResponse {
  passwordChangeNeeded: boolean;
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
  username: string;
  email: string;
  role: string;
  department: string;
  profileImageUrl: string;
}

declare interface RoleChangeData {
  role: string;
}
