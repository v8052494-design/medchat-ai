<template>
  <div class="empty-state">
    <div class="empty-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
        <defs>
          <linearGradient id="emptyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#6c7aff" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.3" />
          </linearGradient>
        </defs>
        <rect width="80" height="80" rx="20" fill="url(#emptyGrad)" />
        <text x="40" y="48" text-anchor="middle" fill="#6c7aff" font-size="28" font-family="sans-serif">💬</text>
      </svg>
    </div>
    <h3 class="empty-title">欢迎使用 MedChat AI</h3>
    <p class="empty-desc">从左侧选择一个会话开始对话，或发送消息获取 AI 智能回复</p>
    <div class="empty-features">
      <div class="feature-item">
        <span class="feature-icon">🤖</span>
        <span>AI 智能回复</span>
      </div>
      <div class="feature-item">
        <span class="feature-icon">📊</span>
        <span>数据统计</span>
      </div>
      <div class="feature-item">
        <span class="feature-icon">🔒</span>
        <span>隐私保护</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@use '@/styles/theme' as *;

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
}

.empty-icon {
  margin-bottom: 8px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.empty-title {
  font-size: 20px;
  font-weight: 700;
  color: $text-primary;
}

.empty-desc {
  font-size: 14px;
  color: $text-secondary;
  text-align: center;
  max-width: 320px;
  line-height: 1.6;
}

.empty-features {
  display: flex;
  gap: 24px;
  margin-top: 12px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  background-color: $bg-card;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  font-size: 12px;
  color: $text-secondary;
  transition: all $transition-normal;

  &:hover {
    border-color: rgba($accent-primary, 0.3);
    transform: translateY(-2px);
    box-shadow: $shadow-sm;
  }
}

.feature-icon {
  font-size: 24px;
}
</style>
