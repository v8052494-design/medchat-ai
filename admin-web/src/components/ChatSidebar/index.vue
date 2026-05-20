<template>
  <div class="chat-sidebar">
    <!-- Header -->
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <div class="logo-icon">
          <el-icon :size="22"><Monitor /></el-icon>
        </div>
        <span class="logo-text">MedChat AI</span>
      </div>
      <div class="sidebar-stats">
        <div class="stat-item">
          <span class="stat-dot online"></span>
          <span class="stat-label">{{ chatStore.onlineCount }} 在线</span>
        </div>
        <div class="stat-item">
          <el-badge :value="chatStore.totalUnread" :max="99" :hidden="chatStore.totalUnread === 0">
            <el-icon :size="18" color="#9499b3"><ChatDotRound /></el-icon>
          </el-badge>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="sidebar-search">
      <el-input
        v-model="searchQuery"
        placeholder="搜索会话..."
        :prefix-icon="Search"
        size="default"
        clearable
      />
    </div>

    <!-- Session List -->
    <div class="session-list">
      <TransitionGroup name="session-list">
        <SessionItem
          v-for="session in filteredSessions"
          :key="session.id"
          :session="session"
          :is-active="session.id === chatStore.currentSessionId"
          @select="chatStore.selectSession"
        />
      </TransitionGroup>
      <div v-if="filteredSessions.length === 0" class="no-results">
        <el-icon :size="32" color="#5e6280"><Search /></el-icon>
        <span>未找到匹配的会话</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Search, Monitor, ChatDotRound } from '@element-plus/icons-vue';
import { useChatStore } from '@/stores/chat';
import SessionItem from '@/components/SessionItem/index.vue';

const chatStore = useChatStore();
const searchQuery = ref('');

const filteredSessions = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return chatStore.sessions;
  return chatStore.sessions.filter(
    (s) =>
      s.nickname.toLowerCase().includes(query) ||
      s.lastMessage.toLowerCase().includes(query),
  );
});
</script>

<style scoped lang="scss">
@use '@/styles/theme' as *;

.chat-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $bg-secondary;
}

.sidebar-header {
  padding: 16px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $border-color;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  width: 36px;
  height: 36px;
  border-radius: $radius-sm;
  background: linear-gradient(135deg, $accent-primary, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.logo-text {
  font-size: 17px;
  font-weight: 700;
  color: $text-primary;
  letter-spacing: 0.5px;
}

.sidebar-stats {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;

  &.online {
    background-color: $accent-secondary;
    box-shadow: 0 0 6px rgba(54, 214, 168, 0.5);
  }
}

.stat-label {
  font-size: 12px;
  color: $text-secondary;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.sidebar-search {
  padding: 12px 14px;

  :deep(.el-input__wrapper) {
    background-color: $bg-tertiary;
    border: 1px solid $border-color;
    border-radius: $radius-md;
    box-shadow: none;

    &:hover,
    &.is-focus {
      border-color: rgba($accent-primary, 0.4);
    }
  }

  :deep(.el-input__inner) {
    color: $text-primary;
    font-size: 13px;

    &::placeholder {
      color: $text-tertiary;
    }
  }

  :deep(.el-input__prefix .el-icon) {
    color: $text-tertiary;
  }
}

.session-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 8px;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px 20px;
  color: $text-tertiary;
  font-size: 13px;
}

// Session list transition
.session-list-enter-active,
.session-list-leave-active {
  transition: all $transition-normal;
}

.session-list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.session-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
