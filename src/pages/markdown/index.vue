<script lang="ts" setup>
import CodeEditor from '@/components/monaco-editor/CodeEditor.vue'
import { marked } from 'marked'
import type { editor } from 'monaco-editor'
import { onUnmounted, ref, watch } from 'vue'
import { defaultSource } from './_defaultSource'

const source = ref(defaultSource)

const html = ref('')
const previewContainer = ref<HTMLElement>()

watch(source, (val) => {
  html.value = marked.parse(val, { async: false }) as string
}, { immediate: true })

let scrollDisposable: { dispose(): void } | undefined

function setupScroll(editor: editor.IStandaloneCodeEditor) {
  scrollDisposable = editor.onDidScrollChange((e) => {
    const el = previewContainer.value
    if (!el) return
    const maxEditor = e.scrollHeight - editor.getLayoutInfo().height
    if (maxEditor <= 0) return
    const ratio = e.scrollTop / maxEditor
    const maxPreview = el.scrollHeight - el.clientHeight
    if (maxPreview <= 0) return
    el.scrollTop = ratio * maxPreview
  })
}

onUnmounted(() => scrollDisposable?.dispose())
</script>

<template>
  <div class="flex h-full">
    <div class="flex-1 border-(0 r solid gray-2)">
      <CodeEditor language="markdown" filepath="preview.md" v-model="source" :setup="setupScroll" />
    </div>
    <div ref="previewContainer" class="flex-1 overflow-auto">
      <div class="markdown-body p-6" v-html="html" />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
