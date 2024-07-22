<script lang="ts" setup>
import CodeEditor from '@/components/monaco-editor/CodeEditor.vue'
import { reactive } from 'vue'

const state = reactive({
  schema: '',
  target: '',
})
</script>

<template>
  <div class="flex h-full">
    <div class="flex-1">
      <CodeEditor language="json" v-model="state.schema" />
    </div>

    <div class="flex-1">
      <CodeEditor language="json" v-model="state.target" />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
