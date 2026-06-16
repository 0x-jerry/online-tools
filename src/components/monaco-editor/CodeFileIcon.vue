<script lang="ts" setup>
import type { Uri } from 'monaco-editor'
import { computed } from 'vue'
import { fileIcon, fileIcons } from './fileIcons'

const props = defineProps<{
  uri: Uri
}>()

const icon = computed(() => {
  const path = props.uri.path
  const suffix = path.split('.').pop() || 'text'

  return fileIcons[suffix] || fileIcon
})
</script>

<template>
  <i :class="['code-file-icon', icon]"></i>
</template>

<style lang="less" scoped>
.code-file-icon {
  --uno: c-gray-5 text-base;
}
</style>
