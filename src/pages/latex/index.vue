<script lang="ts" setup>
import CodeEditor from '@/components/monaco-editor/CodeEditor.vue'
import { useToolStorage } from '@/composables/useToolStorage'
import katex from 'katex'
import { ref, watch } from 'vue'
import { defaultSource } from './_defaultSource'

const source = useToolStorage(defaultSource)

const html = ref('')

watch(
  source,
  (val) => {
    try {
      html.value = katex.renderToString(val.trim() || '\\text{Enter LaTeX}', {
        throwOnError: false,
        displayMode: true,
      })
    } catch {
      html.value = ''
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex-1 h-0 border-(0 b solid gray-2)">
      <CodeEditor language="latex" filepath="preview.tex" v-model="source" />
    </div>
    <div class="flex-1 h-0 overflow-auto flex items-center justify-center bg-light-1">
      <div class="p-6" v-html="html" />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
