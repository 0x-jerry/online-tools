<script lang="ts" setup>
import { useElementSize, useVModel, watchImmediate } from '@vueuse/core'
import { type Uri, editor } from 'monaco-editor'
import { computed, ref } from 'vue'
import { useEditor } from './useEditor'
import './useWorker'
import CodeFileIcon from './CodeFileIcon.vue'
import { createUri } from './utils'

export interface CodeEditorProps {
  language?: string
  modelValue?: string
  options?: editor.IStandaloneEditorConstructionOptions
  filepath?: string | Uri
}

const containerNode = ref<HTMLElement>()
const rootNode = ref<HTMLElement>()

const props = defineProps<CodeEditorProps>()
const emit = defineEmits(['update:modelValue'])

const code = useVModel(props, 'modelValue', emit, { passive: true })

const modelUri = computed(() => createUri(props.filepath))

const codeEditor = useEditor(rootNode, (editor) => {
  editor.onDidChangeModelContent((e) => {
    code.value = editor.getValue()
  })
})

// update model language and filename
watchImmediate(() => [props.language, modelUri.value, codeEditor.value], updateTextModel)

// update model code
watchImmediate(
  () => [props.modelValue, codeEditor.value],
  () => {
    let value = props.modelValue

    value = value || ''

    if (value === code.value) {
      return
    }

    code.value = value

    codeEditor.value?.setValue(code.value)
  },
)

// update editor options
watchImmediate(
  () => [props.options, codeEditor.value],
  () => {
    const editorConfig = props.options
    if (!editorConfig) {
      return
    }

    codeEditor.value?.updateOptions(editorConfig)
  },
)

function updateTextModel() {
  let model = editor.getModel(modelUri.value)

  if (!model) {
    model = editor.createModel(code.value || '', props.language, modelUri.value)
  }

  if (props.language) {
    editor.setModelLanguage(model, props.language)
  }

  codeEditor.value?.setModel(model)
}

const containerNodeSize = useElementSize(containerNode)

defineExpose({
  codeEditor,
})
</script>

<template>
  <div class="flex size-full flex-col">
    <div class="title px-2 py-1 bg-light-4 font-mono text-sm">
      <CodeFileIcon :uri="modelUri" />
      <span>
        {{ modelUri.path.slice(1) }}
      </span>
    </div>
    <div class="code-editor flex-1 h-0" ref="containerNode">
      <div
        class="code-editor-container"
        :style="{
          width: `${containerNodeSize.width.value}px`,
          height: `${containerNodeSize.height.value}px`,
        }"
        ref="rootNode"
      />
    </div>
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

.title {
  @apply flex items-center gap-2;
}
</style>
