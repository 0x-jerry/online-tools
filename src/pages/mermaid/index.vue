<script lang="ts" setup>
import CodeEditor from '@/components/monaco-editor/CodeEditor.vue'
import CopyIcon from '@/components/CopyIcon.vue'
import PreviewPanel from '@/components/PreviewPanel.vue'
import { useToolStorage } from '@/composables/useToolStorage'
import { watchDebounced } from '@vueuse/core'
import mermaid from 'mermaid'
import { computed, onMounted, ref } from 'vue'
import { defaultSource } from './_defaultSource'
import { downloadSvg, downloadPng, copyPngToClipboard } from './_utils'
import { escapeHtml } from '@/utils'

const source = useToolStorage(defaultSource)
const html = ref('')
const previewRef = ref<InstanceType<typeof PreviewPanel>>()
const prevSource = ref('')

const hasDiagram = computed(() => html.value.includes('<svg'))

onMounted(() => {
  mermaid.initialize({ startOnLoad: false, htmlLabels: false })
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

function downloadSvgFile() {
  downloadSvg(html.value, 'diagram.svg')
}

function downloadPngFile() {
  downloadPng(html.value, 'diagram.png')
}

function copyPng() {
  return copyPngToClipboard(html.value)
}
</script>

<template>
  <div class="flex h-full">
    <div class="flex-1 border-(0 r solid gray-2)">
      <CodeEditor language="mermaid" filepath="diagram.mmd" v-model="source" />
    </div>
    <div class="flex-1 bg-light-1">
      <PreviewPanel ref="previewRef">
        <template #actions>
          <CopyIcon
            title="Copy diagram as PNG"
            :copy="copyPng"
            :disabled="!hasDiagram"
          />
          <button
            class="dl-btn"
            title="Download as SVG"
            :disabled="!hasDiagram"
            @click="downloadSvgFile"
          >
            <i class="i-carbon:svg"></i>
          </button>
          <button
            class="dl-btn"
            title="Download as PNG"
            :disabled="!hasDiagram"
            @click="downloadPngFile"
          >
            <i class="i-carbon:png"></i>
          </button>
        </template>
        <div v-html="html" />
      </PreviewPanel>
    </div>
  </div>
</template>

<style lang="less" scoped>
.dl-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #555;
  border-radius: 4px;

  i {
    font-size: 14px;
  }

  &:hover:not(:disabled) {
    background: #00000010;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
