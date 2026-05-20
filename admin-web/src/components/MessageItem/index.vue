<template>
  <div class="message-item" :class="[`message-${message.role}`]">
    <img
      v-if="message.role === 'ai'"
      :src="aiAvatar"
      alt="AI"
      class="msg-avatar"
    />
    <img
      v-else
      :src="sessionAvatar"
      :alt="sessionName"
      class="msg-avatar"
    />
    <div class="msg-body">
      <div class="msg-meta">
        <span class="msg-sender">{{ message.role === 'ai' ? 'AI 助手' : sessionName }}</span>
        <span class="msg-time">{{ formatMessageTime(message.timestamp) }}</span>
      </div>
      <div class="msg-bubble" :class="[`bubble-${message.role}`]">
        <!-- Text message -->
        <div v-if="message.type === 'text'" class="msg-text" v-html="renderContent(message.content)"></div>
        <!-- Image message -->
        <div v-else-if="message.type === 'image'" class="msg-image">
          <img :src="message.content" alt="图片" @click="previewImage(message.content)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ChatMessage } from '@/types/chat';
import { useChatStore } from '@/stores/chat';
import { formatMessageTime } from '@/utils/time';

const props = defineProps<{
  message: ChatMessage;
}>();

const chatStore = useChatStore();

const aiAvatar = computed(() => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="url(#g)"/><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6c7aff"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs><text x="20" y="26" text-anchor="middle" fill="#fff" font-size="16" font-family="sans-serif">AI</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
});

const sessionAvatar = computed(() => {
  return chatStore.currentSession?.avatar || '';
});

const sessionName = computed(() => {
  return chatStore.currentSession?.nickname || '用户';
});

function renderContent(content: string): string {
  // Simple markdown-like rendering
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

function previewImage(src: string) {
  window.open(src, '_blank');
}
</script>

<style scoped lang="scss">
@use '@/styles/theme' as *;

.message-item {
  display: flex;
  gap: 10px;
  max-width: 75%;

  &.message-user {
    align-self: flex-end;
    flex-direction: row-reverse;

    .msg-meta {
      justify-content: flex-end;
    }

    .msg-bubble {
      background: linear-gradient(135deg, $accent-primary, #8b5cf6);
      color: #fff;
      border-radius: $radius-md $radius-sm $radius-md $radius-md;
    }
  }

  &.message-ai {
    align-self: flex-start;

    .msg-bubble {
      background-color: $bg-card;
      border: 1px solid $border-color;
      color: $text-primary;
      border-radius: $radius-sm $radius-md $radius-md $radius-md;
    }
  }

  &.message-system {
    align-self: center;

    .msg-bubble {
      background-color: $bg-tertiary;
      color: $text-secondary;
      border-radius: $radius-lg;
      font-size: 12px;
    }
  }
}

.msg-avatar {
  width: 36px;
  height: 36px;
  border-radius: $radius-sm;
  flex-shrink: 0;
  margin-top: 4px;
}

.msg-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.msg-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.msg-sender {
  font-size: 12px;
  font-weight: 500;
  color: $text-secondary;
}

.msg-time {
  font-size: 11px;
  color: $text-tertiary;
}

.msg-bubble {
  padding: 10px 14px;
  line-height: 1.6;
  font-size: 13.5px;
  word-break: break-word;
  transition: all $transition-fast;

  &:hover {
    box-shadow: $shadow-sm;
  }
}

.msg-text {
  :deep(strong) {
    color: $accent-primary;
    font-weight: 600;
  }
}

.msg-image {
  img {
    max-width: 240px;
    max-height: 200px;
    border-radius: $radius-sm;
    cursor: pointer;
    transition: transform $transition-fast;

    &:hover {
      transform: scale(1.02);
    }
  }
}
</style>
