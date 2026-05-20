export type UserRole = 'admin' | 'agent' | 'user';

export interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
  role: UserRole;
  status: 'online' | 'offline';
}
