<script lang="ts" setup>
import CodeEditor from '@/components/monaco-editor/CodeEditor.vue'
import { useInstance } from '@/composables/useInstance'
import { languages } from 'monaco-editor'
import { onUnmounted, reactive, watch } from 'vue'

const schemaEditor = useInstance(CodeEditor)
const valueEditor = useInstance(CodeEditor)

const state = reactive({
  schema: '',
  target: '',
})

watch(
  () => [state.schema],
  () => {
    const schemas = [
      {
        uri: 'https://json-schema.org/draft-07/schema',
        fileMatch: ['schema.json'],
        schema: undefined as any,
      },
    ]

    try {
      const schema = JSON.parse(state.schema)

      schemas.push({
        uri: 'schema.json',
        schema,
        fileMatch: ['test.json'],
      })
    } catch (error) {
      console.warn(error)
      return
    }

    languages.json.jsonDefaults.setDiagnosticsOptions({
      enableSchemaRequest: true,
      validate: true,
      schemas,
    })
  },
)

onUnmounted(() => {
  languages.json.jsonDefaults.setDiagnosticsOptions({})
})
</script>

<template>
  <div class="flex h-full">
    <div class="flex-1 border-(0 r solid gray-2)">
      <CodeEditor
        ref="schemaEditor"
        language="json"
        filepath="schema.json"
        v-model="state.schema"
      />
    </div>

    <div class="flex-1">
      <CodeEditor ref="valueEditor" language="json" filepath="test.json" v-model="state.target" />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
