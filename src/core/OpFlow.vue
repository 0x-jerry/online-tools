<script lang="ts" setup>
import type { Component } from 'vue'
import { provideFlowStore } from './store'

const props = defineProps<{
  ops: Record<string, Component>
  data?: any
}>()

const store = provideFlowStore(props.data)

function onDrop(e: DragEvent) {
  const d = e.dataTransfer
  const type = d?.getData('op')

  if (!type) return

  store.create(type)
}

function findComp(type: string) {
  return props.ops[type]
}

const comps = ref<{ exec(p?: any): any }[]>([])

defineExpose({
  store,
  run() {
    const value = store.data.stack.reduce((preValue, _, idx) => {
      return comps.value[idx].exec(preValue)
    }, null)

    return value
  },
})
</script>

<template>
  <div @drop="onDrop" @dragover.prevent>
    <Component
      v-for="o in store.data.stack"
      :id="o.id"
      :is="findComp(o.type)"
      :data="o.data"
      ref="comps"
    ></Component>
  </div>
</template>
