<template>
  <div
    class="session-item"
    :class="{ active: isActive }"
    @click="$emit('select', session.id)"
  >
    <div class="session-avatar">
      <img :src="session.avatar" :alt="session.nickname" />
      <span class="status-dot" :class="session.status"></span>
    </div>
    <div class="session-info">
      <div class="session-header">
        <span class="session-name">{{ session.nickname }}</span>
        <span class="session-time">{{ formatTime(session.lastTime) }}</span>
      </div>
      <div class="session-footer">
        <span class="session-last-msg text-ellipsis">{{ session.lastMessage }}</span>
        <span v-if="session.unreadCount > 0" class="unread-badge">
          {{ session.unreadCount > 99 ? '99+' : session.unreadCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatSession } from '@/types/chat';
import { formatTime } from '@/utils/time';

defineProps<{
  session: ChatSession;
  isActive: boolean;
}>();

defineEmits<{
  select: [sessionId: string];
}>();
</script>

<style scoped lang="scss">
@use '@/styles/theme' as *;

.session-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: $radius-md;
  cursor: pointer;
  transition: all $transition-fast;
  margin-bottom: 2px;

  &:hover {
    background-color: $bg-hover;
  }

  &.active {
    background-color: $bg-active;
    border-left: 3px solid $accent-primary;
    padding-left: 11px;

    .session-name {
      color: $text-primary;
    }
  }
}

.session-avatar {
  position: relative;
  flex-shrink: 0;

  img {
    width: 44px;
    height: 44px;
    border-radius: $radius-sm;
    object-fit: cover;
  }
}

.status-dot {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid $bg-secondary;

  &.online {
    background-color: $accent-secondary;
    box-shadow: 0 0 6px rgba(54, 214, 168, 0.4);
  }

  &.busy {
    background-color: $accent-warning;
    box-shadow: 0 0 6px rgba(245, 166, 35, 0.4);
  }

  &.offline {
    background-color: $text-tertiary;
  }
}

.session-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.session-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.session-name {
  font-size: 14px;
  font-weight: 500;
  color: $text-primary;
}

.session-time {
  font-size: 11px;
  color: $text-tertiary;
  flex-shrink: 0;
}

.session-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.session-last-msg {
  font-size: 12px;
  color: $text-secondary;
  max-width: 180px;
}

.unread-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: linear-gradient(135deg, $accent-primary, #8b5cf6);
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  flex-shrink: 0;
}
</style>
