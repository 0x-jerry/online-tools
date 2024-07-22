import { editor } from 'monaco-editor'
import { onMounted, onUnmounted, type Ref } from 'vue'

export function useEditor(
  rootNode: Ref<HTMLElement | undefined>,
  option?: editor.IStandaloneEditorConstructionOptions,
) {
  const dom = document.createElement('div')
  dom.style.width = '100%'
  dom.style.height = '100%'

  const editorInstance = editor.create(dom, {
    automaticLayout: true,
    ...option,
  })

  onMounted(() => {
    rootNode.value?.appendChild(dom)
  })

  onUnmounted(() => {
    editorInstance.dispose()
  })

  return editorInstance
}
