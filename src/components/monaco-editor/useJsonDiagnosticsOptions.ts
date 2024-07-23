import { languages } from 'monaco-editor'
import { onMounted, onUnmounted } from 'vue'

/**
 * https://www.schemastore.org/json/
 *
 * @param option
 */
export function useJsonDiagnosticsOptions(option: languages.json.DiagnosticsOptions) {
  onMounted(() => {
    languages.json.jsonDefaults.setDiagnosticsOptions({
      enableSchemaRequest: true,
      ...option,
    })
  })

  onUnmounted(() => {
    languages.json.jsonDefaults.setDiagnosticsOptions({})
  })
}
