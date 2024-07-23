<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue'
import { routeState } from './modules/router'
</script>

<template>
  <div class="flex w-screen h-screen">
    <div class="sidebar">
      <AppSidebar />
    </div>

    <div class="flex-1 w-0 flex flex-col">
      <div class="title"></div>
      <div class="flex-1 h-0 flex flex-col relative">
        <router-view></router-view>
        <div class="loading" v-if="routeState.isLoading">
          <i class="i-mdi:loading animate-spin text-(6xl rose-4)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.sidebar {
  width: 220px;

  @apply border-(0 r solid gray-2);
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;

  @apply size-full flex items-center justify-center;
  @apply bg-gray-2 bg-op-50;
  @apply backdrop-blur-2;
}
</style>
