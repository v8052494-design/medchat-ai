import type { ChatSession } from '@/types/chat';

const avatarColors = [
  '#6c7aff', '#36d6a8', '#f5a623', '#f56565',
  '#9b59b6', '#1abc9c', '#e67e22', '#3498db',
  '#e74c3c', '#2ecc71',
];

function generateAvatar(name: string, index: number): string {
  const color = avatarColors[index % avatarColors.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="${color}"/><text x="20" y="26" text-anchor="middle" fill="#fff" font-size="16" font-family="sans-serif">${name.charAt(0)}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const mockSessions: ChatSession[] = [
  {
    id: 's1',
    userId: 'u1',
    nickname: '张明辉',
    avatar: generateAvatar('张', 0),
    lastMessage: '发烧怎么办？',
    lastTime: Date.now() - 1000 * 60 * 2,
    unreadCount: 3,
    status: 'online',
  },
  {
    id: 's2',
    userId: 'u2',
    nickname: '李雪婷',
    avatar: generateAvatar('李', 1),
    lastMessage: '请问医保怎么报销？',
    lastTime: Date.now() - 1000 * 60 * 15,
    unreadCount: 1,
    status: 'online',
  },
  {
    id: 's3',
    userId: 'u3',
    nickname: '王建国',
    avatar: generateAvatar('王', 2),
    lastMessage: '体检报告什么时候出？',
    lastTime: Date.now() - 1000 * 60 * 30,
    unreadCount: 0,
    status: 'online',
  },
  {
    id: 's4',
    userId: 'u4',
    nickname: '赵晓芳',
    avatar: generateAvatar('赵', 3),
    lastMessage: '预约挂号可以取消吗？',
    lastTime: Date.now() - 1000 * 60 * 60,
    unreadCount: 2,
    status: 'busy',
  },
  {
    id: 's5',
    userId: 'u5',
    nickname: '陈志强',
    avatar: generateAvatar('陈', 4),
    lastMessage: '谢谢医生，已经好多了',
    lastTime: Date.now() - 1000 * 60 * 120,
    unreadCount: 0,
    status: 'offline',
  },
  {
    id: 's6',
    userId: 'u6',
    nickname: '刘美玲',
    avatar: generateAvatar('刘', 5),
    lastMessage: '孩子发烧39度怎么办？',
    lastTime: Date.now() - 1000 * 60 * 180,
    unreadCount: 5,
    status: 'online',
  },
  {
    id: 's7',
    userId: 'u7',
    nickname: '孙伟东',
    avatar: generateAvatar('孙', 6),
    lastMessage: '网上购药怎么操作？',
    lastTime: Date.now() - 1000 * 60 * 240,
    unreadCount: 0,
    status: 'offline',
  },
  {
    id: 's8',
    userId: 'u8',
    nickname: '周雨萱',
    avatar: generateAvatar('周', 7),
    lastMessage: '核酸检测结果查询',
    lastTime: Date.now() - 1000 * 60 * 360,
    unreadCount: 1,
    status: 'online',
  },
  {
    id: 's9',
    userId: 'u9',
    nickname: '吴海涛',
    avatar: generateAvatar('吴', 8),
    lastMessage: '住院费用明细在哪里看？',
    lastTime: Date.now() - 1000 * 60 * 480,
    unreadCount: 0,
    status: 'busy',
  },
  {
    id: 's10',
    userId: 'u10',
    nickname: '郑小燕',
    avatar: generateAvatar('郑', 9),
    lastMessage: '可以开电子处方吗？',
    lastTime: Date.now() - 1000 * 60 * 600,
    unreadCount: 0,
    status: 'online',
  },
];
