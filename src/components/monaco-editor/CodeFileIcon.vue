<script lang="ts" setup>
import type { Uri } from 'monaco-editor'
import { computed } from 'vue'

const props = defineProps<{
  uri: Uri
}>()

const icon = computed(() => {
  const path = props.uri.path
  const suffix = path.split('.').pop()

  switch (suffix) {
    case 'json':
      return 'i-mdi:code-json'
    case 'js':
      return 'i-mdi:language-javascript'
    case 'ts':
      return 'i-mdi:language-typescript'
    default:
      break
  }

  return ''
})
</script>

<template>
  <i :class="['code-file-icon', icon]"></i>
</template>

<style lang="less" scoped>
.code-file-icon {
  @apply c-gray-5 text-base;
}
</style>
