<template>
  <div class="chat-window">
    <!-- Top navigation bar -->
    <div class="chat-header">
      <div class="header-left">
        <div v-if="chatStore.currentSession" class="current-user">
          <img
            :src="chatStore.currentSession.avatar"
            :alt="chatStore.currentSession.nickname"
            class="user-avatar"
          />
          <div class="user-info">
            <span class="user-name">{{ chatStore.currentSession.nickname }}</span>
            <span class="user-status" :class="chatStore.currentSession.status">
              {{ statusText(chatStore.currentSession.status) }}
            </span>
          </div>
        </div>
        <div v-else class="no-selection">选择一个会话开始</div>
      </div>
      <div class="header-right">
        <div class="header-stat">
          <el-icon :size="14"><User /></el-icon>
          <span>{{ chatStore.onlineCount }} 在线</span>
        </div>
        <div class="header-divider"></div>
        <div class="header-stat time-stat">
          <el-icon :size="14"><Clock /></el-icon>
          <span>{{ currentTime }}</span>
        </div>
        <div class="header-divider"></div>
        <div class="header-stat ai-stat">
          <span class="ai-dot"></span>
          <span>AI 客服在线</span>
        </div>
      </div>
    </div>

    <!-- Chat content area -->
    <div class="chat-body">
      <div v-if="chatStore.currentSessionId" class="chat-content">
        <div ref="messageListRef" class="message-list">
          <TransitionGroup name="message-fade">
            <MessageItem
              v-for="msg in chatStore.currentMessages"
              :key="msg.id"
              :message="msg"
            />
          </TransitionGroup>
        </div>
        <MessageInput />
      </div>

      <!-- Empty state -->
      <EmptyState v-else />

      <!-- Stats panel -->
      <StatsPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { User, Clock } from '@element-plus/icons-vue';
import { useChatStore } from '@/stores/chat';
import { getCurrentTime } from '@/utils/time';
import { useScroll } from '@/hooks/useScroll';
import MessageItem from '@/components/MessageItem/index.vue';
import MessageInput from '@/components/MessageInput/index.vue';
import EmptyState from '@/components/EmptyState/index.vue';
import StatsPanel from '@/components/StatsPanel/index.vue';

const chatStore = useChatStore();
const messageListRef = ref<HTMLElement | null>(null);
const currentTime = ref(getCurrentTime());
const { scrollToBottom } = useScroll(messageListRef);

let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = getCurrentTime();
  }, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

// Auto-scroll when messages change
watch(
  () => chatStore.currentMessages.length,
  () => {
    setTimeout(scrollToBottom, 50);
  },
);

// Auto-select first session if none selected
if (!chatStore.currentSessionId && chatStore.sessions.length > 0) {
  chatStore.selectSession(chatStore.sessions[0].id);
}

function statusText(status: string): string {
  const map: Record<string, string> = {
    online: '在线',
    offline: '离线',
    busy: '忙碌',
  };
  return map[status] || status;
}
</script>

<style scoped lang="scss">
@use '@/styles/theme' as *;

.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $bg-primary;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $header-height;
  padding: 0 24px;
  border-bottom: 1px solid $border-color;
  background-color: $bg-secondary;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
}

.current-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: $radius-sm;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: $text-primary;
}

.user-status {
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 4px;

  &.online { color: $accent-secondary; }
  &.busy { color: $accent-warning; }
  &.offline { color: $text-tertiary; }

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  &.online::before { background-color: $accent-secondary; }
  &.busy::before { background-color: $accent-warning; }
  &.offline::before { background-color: $text-tertiary; }
}

.no-selection {
  color: $text-tertiary;
  font-size: 13px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.header-stat {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: $text-secondary;
  padding: 4px 10px;
  background-color: $bg-tertiary;
  border-radius: $radius-sm;
}

.header-divider {
  width: 1px;
  height: 16px;
  background-color: $border-color;
  margin: 0 4px;
}

.ai-stat {
  .ai-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: $accent-primary;
    animation: pulse-dot 2s ease-in-out infinite;
  }
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 4px rgba(108, 122, 255, 0.4); }
  50% { opacity: 0.6; box-shadow: 0 0 8px rgba(108, 122, 255, 0.2); }
}

.chat-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

// Message fade transition
.message-fade-enter-active {
  transition: all $transition-normal;
}

.message-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
</style>
