<script lang="ts" setup>
import CodeEditor from '@/components/monaco-editor/CodeEditor.vue'
import { useInstance } from '@/composables/useInstance'
import { useToolStorage } from '@/composables/useToolStorage'
import { json } from 'monaco-editor'
import { onUnmounted, watch } from 'vue'

const schemaEditor = useInstance(CodeEditor)
const valueEditor = useInstance(CodeEditor)

const schema = useToolStorage('', 'schema')
const target = useToolStorage('', 'target')

watch(
  () => schema.value,
  () => {
    const schemas = [
      {
        uri: 'https://json-schema.org/draft-07/schema',
        fileMatch: ['schema.json'],
        schema: undefined as Record<string, string> | undefined,
      },
    ]

    try {
      const parsed = JSON.parse(schema.value)

      schemas.push({
        uri: 'schema.json',
        schema: parsed,
        fileMatch: ['test.json'],
      })
    } catch (error) {
      console.warn(error)
      return
    }

    json.jsonDefaults.setDiagnosticsOptions({
      enableSchemaRequest: true,
      validate: true,
      schemas,
    })
  },
)

onUnmounted(() => {
  json.jsonDefaults.setDiagnosticsOptions({})
})
</script>

<template>
  <div class="flex h-full">
    <div class="flex-1 border-(0 r solid gray-2)">
      <CodeEditor ref="schemaEditor" language="json" filepath="schema.json" v-model="schema" />
    </div>

    <div class="flex-1">
      <CodeEditor ref="valueEditor" language="json" filepath="test.json" v-model="target" />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
