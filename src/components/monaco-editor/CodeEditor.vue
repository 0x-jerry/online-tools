<script lang="ts" setup>
import { useEditor } from './useEditor'
import { ref } from 'vue'
import { useElementSize, useVModel, watchImmediate } from '@vueuse/core'
import { editor } from 'monaco-editor'
import './useWorker'

export interface CodeEditorProps {
  language: string
  modelValue?: string
  options?: editor.IStandaloneEditorConstructionOptions
}

const containerNode = ref<HTMLElement>()
const rootNode = ref<HTMLElement>()

const props = defineProps<CodeEditorProps>()
const emit = defineEmits(['update:modelValue'])

const code = useVModel(props, 'modelValue', emit, { passive: true })

const codeEditor = useEditor(rootNode)

watchImmediate(
  () => props.modelValue,
  (value) => {
    value = value || ''

    if (value === code.value) {
      return
    }

    code.value = value

    codeEditor.setValue(code.value)
    // const textModel = codeEditor.getModel()
    // textModel?.setValue()
    // editor.setModelLanguage()
    // editor.setModel
    // editor.getModel()?.getLanguageId()
  },
)

watchImmediate(
  () => props.language,
  (lang) => {
    const textModel = codeEditor.getModel()
    if (!textModel) {
      return
    }

    editor.setModelLanguage(textModel, lang)
  },
)

watchImmediate(
  () => props.options,
  (editorConfig) => {
    if (!editorConfig) {
      return
    }

    codeEditor.updateOptions(editorConfig)
  },
)

const containerNodeSize = useElementSize(containerNode)
</script>

<template>
  <div class="code-editor" ref="containerNode">
    <div
      class="code-editor-container"
      :style="{
        width: `${containerNodeSize.width.value}px`,
        height: `${containerNodeSize.height.value}px`,
      }"
      ref="rootNode"
    ></div>
    <!--  -->
  </div>
</template>

<style lang="less" scoped>
.code-editor {
  @apply size-full;
  position: relative;
}

.code-editor-container {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
