<template>
  <MainLayout>
    <template #default>
      <div class="chat-view">
        <ChatWindow />
      </div>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/layout/MainLayout.vue';
import ChatWindow from '@/components/ChatWindow/index.vue';
</script>

<style scoped lang="scss">
.chat-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
