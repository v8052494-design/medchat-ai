export type MessageRole = 'user' | 'ai' | 'system';
export type MessageType = 'text' | 'image';
export type SessionStatus = 'online' | 'offline' | 'busy';

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: MessageRole;
  type: MessageType;
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  userId: string;
  nickname: string;
  avatar: string;
  lastMessage: string;
  lastTime: number;
  unreadCount: number;
  status: SessionStatus;
}
