<template>
  <div class="message-input">
    <div class="input-toolbar">
      <el-tooltip content="上传图片" placement="top" :show-after="500">
        <button class="tool-btn" @click="handleImageUpload">
          <el-icon :size="18"><Picture /></el-icon>
        </button>
      </el-tooltip>
      <el-tooltip content="常用语" placement="top" :show-after="500">
        <button class="tool-btn">
          <el-icon :size="18"><Document /></el-icon>
        </button>
      </el-tooltip>
    </div>
    <div class="input-area">
      <el-input
        v-model="inputText"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 4 }"
        placeholder="输入消息，Enter 发送..."
        resize="none"
        @keydown.enter.exact.prevent="handleSend"
      />
    </div>
    <div class="input-footer">
      <span class="input-hint">按 Enter 发送，Shift+Enter 换行</span>
      <el-button
        type="primary"
        :disabled="!inputText.trim()"
        @click="handleSend"
      >
        <el-icon class="btn-icon"><Promotion /></el-icon>
        发送
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Picture, Document, Promotion } from '@element-plus/icons-vue';
import { useChatStore } from '@/stores/chat';
import { useMockReply } from '@/hooks/useMockReply';

const chatStore = useChatStore();
const inputText = ref('');
const { generateReply } = useMockReply();

function handleSend() {
  const content = inputText.value.trim();
  if (!content || !chatStore.currentSessionId) return;

  chatStore.sendMessage(content);
  inputText.value = '';

  // Trigger mock AI reply
  generateReply(content, chatStore.currentSessionId);
}

function handleImageUpload() {
  if (!chatStore.currentSessionId) return;
  const randomId = Math.floor(Math.random() * 1000);
  chatStore.sendMessage(`https://picsum.photos/300/200?random=${randomId}`, 'image');
}
</script>

<style scoped lang="scss">
@use '@/styles/theme' as *;

.message-input {
  border-top: 1px solid $border-color;
  background-color: $bg-secondary;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-toolbar {
  display: flex;
  gap: 4px;
}

.tool-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: $radius-sm;
  border: none;
  background-color: transparent;
  color: $text-secondary;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover {
    background-color: $bg-hover;
    color: $accent-primary;
  }
}

.input-area {
  :deep(.el-textarea__inner) {
    background-color: $bg-tertiary;
    border: 1px solid $border-color;
    border-radius: $radius-md;
    color: $text-primary;
    font-size: 13.5px;
    line-height: 1.6;
    padding: 10px 14px;
    box-shadow: none;

    &::placeholder {
      color: $text-tertiary;
    }

    &:hover {
      border-color: rgba($accent-primary, 0.3);
    }

    &:focus {
      border-color: $accent-primary;
    }
  }
}

.input-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.input-hint {
  font-size: 11px;
  color: $text-tertiary;
}

:deep(.el-button--primary) {
  background: linear-gradient(135deg, $accent-primary, #8b5cf6);
  border: none;
  border-radius: $radius-sm;
  padding: 8px 20px;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
    background: linear-gradient(135deg, $accent-primary, #8b5cf6);
  }

  &.is-disabled {
    opacity: 0.5;
  }
}

.btn-icon {
  margin-right: 4px;
}
</style>
