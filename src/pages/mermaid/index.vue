<script lang="ts" setup>
import CodeEditor from '@/components/monaco-editor/CodeEditor.vue'
import PreviewPanel from '@/components/PreviewPanel.vue'
import { useToolStorage } from '@/composables/useToolStorage'
import { watchDebounced } from '@vueuse/core'
import mermaid from 'mermaid'
import { onMounted, ref } from 'vue'
import { defaultSource } from './_defaultSource'

const source = useToolStorage(defaultSource)
const html = ref('')
const previewRef = ref<InstanceType<typeof PreviewPanel>>()
const prevSource = ref('')

onMounted(() => {
  mermaid.initialize({ startOnLoad: false })
})

watchDebounced(
  source,
  async (val: string) => {
    const trimmed = val.trim()

    if (prevSource.value === trimmed) {
      return
    }

    prevSource.value = trimmed

    try {
      if (!trimmed) {
        html.value = '<div class="text-gray-4 text-center p-6">Enter Mermaid diagram code</div>'
        return
      }
      const { svg } = await mermaid.render('mermaid-diagram', trimmed)

      if (html.value !== svg) {
        html.value = svg
        previewRef.value?.reset()
      }
    } catch (e: unknown) {
      html.value = `<div class="text-red-5 p-4">${escapeHtml(String(e))}</div>`
      previewRef.value?.reset()
    }
  },
  { immediate: true, debounce: 300 },
)

function escapeHtml(str: string) {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return str.replace(/[&<>"']/g, (c) => map[c])
}
</script>

<template>
  <div class="flex h-full">
    <div class="flex-1 border-(0 r solid gray-2)">
      <CodeEditor language="mermaid" filepath="diagram.mmd" v-model="source" />
    </div>
    <div class="flex-1 bg-light-1">
      <PreviewPanel ref="previewRef">
        <div v-html="html" />
      </PreviewPanel>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
