<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue'
</script>

<template>
  <div class="flex w-screen h-screen">
    <div class="sidebar">
      <AppSidebar />
    </div>

    <div class="flex-1 w-0 flex flex-col">
      <div class="title"></div>
      <div class="flex-1 h-0 flex flex-col">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.sidebar {
  width: 300px;

  @apply border-(0 r solid gray-2);
}
</style>
