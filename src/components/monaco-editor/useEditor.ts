import { editor } from 'monaco-editor'
import { onMounted, onUnmounted, shallowRef, type Ref } from 'vue'

export function useEditor(
  rootNode: Ref<HTMLElement | undefined>,
  setup?: (ctx: editor.IStandaloneCodeEditor) => void,
) {
  const instance = shallowRef<editor.IStandaloneCodeEditor>()

  onMounted(() => {
    const dom = document.createElement('div')
    dom.style.width = '100%'
    dom.style.height = '100%'

    const editorInstance = editor.create(dom, {
      automaticLayout: true,
    })

    setup?.(editorInstance)

    rootNode.value?.appendChild(dom)

    instance.value = editorInstance
  })

  onUnmounted(() => {
    instance.value?.dispose()
    instance.value = undefined
  })

  return instance
}
