<template>
  <div class="main-layout">
    <div class="layout-sidebar">
      <ChatSidebar />
    </div>
    <div class="layout-main">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatSidebar from '@/components/ChatSidebar/index.vue';
</script>

<style scoped lang="scss">
@use '@/styles/theme' as *;

.main-layout {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: $bg-primary;
  overflow: hidden;
}

.layout-sidebar {
  width: $sidebar-width;
  min-width: $sidebar-width;
  height: 100%;
  border-right: 1px solid $border-color;
  display: flex;
  flex-direction: column;
}

.layout-main {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
