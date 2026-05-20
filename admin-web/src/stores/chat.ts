import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ChatSession, ChatMessage } from '@/types/chat';
import { mockSessions } from '@/mock/sessions';
import { getMessagesBySessionId } from '@/mock/messages';

export const useChatStore = defineStore('chat', () => {
  const sessions = ref<ChatSession[]>([...mockSessions]);
  const currentSessionId = ref<string>('');
  const messagesMap = ref<Record<string, ChatMessage[]>>({});

  // Initialize messages for all sessions
  sessions.value.forEach((session) => {
    messagesMap.value[session.id] = getMessagesBySessionId(session.id);
  });

  const currentSession = computed<ChatSession | undefined>(() =>
    sessions.value.find((s) => s.id === currentSessionId.value),
  );

  const currentMessages = computed<ChatMessage[]>(() =>
    messagesMap.value[currentSessionId.value] || [],
  );

  const totalUnread = computed<number>(() =>
    sessions.value.reduce((sum, s) => sum + s.unreadCount, 0),
  );

  const onlineCount = computed<number>(() =>
    sessions.value.filter((s) => s.status === 'online').length,
  );

  function selectSession(sessionId: string) {
    currentSessionId.value = sessionId;
    const session = sessions.value.find((s) => s.id === sessionId);
    if (session) {
      session.unreadCount = 0;
    }
  }

  function addMessage(message: ChatMessage) {
    if (!messagesMap.value[message.sessionId]) {
      messagesMap.value[message.sessionId] = [];
    }
    messagesMap.value[message.sessionId].push(message);

    // Update session last message
    const session = sessions.value.find((s) => s.id === message.sessionId);
    if (session) {
      session.lastMessage = message.type === 'image' ? '[图片]' : message.content;
      session.lastTime = message.timestamp;
    }
  }

  function sendMessage(content: string, type: 'text' | 'image' = 'text') {
    if (!currentSessionId.value) return;

    const message: ChatMessage = {
      id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      sessionId: currentSessionId.value,
      role: 'user',
      type,
      content,
      timestamp: Date.now(),
    };

    addMessage(message);
  }

  function addAiReply(sessionId: string, content: string) {
    const message: ChatMessage = {
      id: `m-ai-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      sessionId,
      role: 'ai',
      type: 'text',
      content,
      timestamp: Date.now(),
    };

    addMessage(message);
  }

  return {
    sessions,
    currentSessionId,
    messagesMap,
    currentSession,
    currentMessages,
    totalUnread,
    onlineCount,
    selectSession,
    addMessage,
    sendMessage,
    addAiReply,
  };
});
