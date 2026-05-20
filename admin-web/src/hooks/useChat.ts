import { computed } from 'vue';
import { useChatStore } from '@/stores/chat';
import type { ChatMessage, ChatSession } from '@/types/chat';

export function useChat() {
  const chatStore = useChatStore();

  const currentSession = computed(() => chatStore.currentSession);
  const currentMessages = computed(() => chatStore.currentMessages);
  const sessions = computed(() => chatStore.sessions);

  function selectSession(sessionId: string) {
    chatStore.selectSession(sessionId);
  }

  function sendMessage(content: string, type: 'text' | 'image' = 'text') {
    chatStore.sendMessage(content, type);
  }

  return {
    currentSession,
    currentMessages,
    sessions,
    selectSession,
    sendMessage,
  };
}
