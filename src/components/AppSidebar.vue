<script lang="ts" setup>
import { type ToolManifest, visibleTools } from '@/tools'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const filter = ref('')

const route = useRoute()

const filteredTools = computed(() => {
  return filter.value ? visibleTools.filter((n) => n.name.includes(filter.value)) : visibleTools
})

function isActive(tool: ToolManifest) {
  return route.path === tool.route
}
</script>

<template>
  <div class="flex flex-col">
    <div class="search p-2 border-(0 b solid gray-2)">
      <div class="search-item">
        <i class="icon i-carbon:search"></i>
        <input class="search-input" v-model="filter" />
      </div>
    </div>
    <div class="items">
      <div
        v-for="tool in filteredTools"
        :key="tool.id"
        class="tool-item"
        :class="{ 'is-active': isActive(tool) }"
        @click="$router.push(tool.route)"
      >
        <i class="icon" :class="[tool.icon || 'i-carbon:code']"></i>
        <span>{{ tool.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.search-item {
  --uno: flex items-center;

  .search-input {
    border: none;
    flex: 1;
    outline: none;
  }
}

.items {
  --uno: flex flex-col;
}

.tool-item {
  --uno: flex items-center py-2 px-2;
  --uno: bg-white cursor-pointer;
  --uno: c-gray-6;

  &:hover {
    --uno: bg-light-1;
  }

  &.is-active {
    --uno: bg-light-6;
  }

  .icon {
    --uno: text-lg;
    --uno: mr-1;
  }
}
</style>
