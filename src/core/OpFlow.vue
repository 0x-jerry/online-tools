<script lang="ts" setup>
import Draggable from 'vuedraggable'
import type { Component } from 'vue'
import { provideFlowStore } from './store'

const props = defineProps<{
  ops: Record<string, Component>
  data?: any
}>()

const store = provideFlowStore(props.data)

function findComp(type: string) {
  return props.ops[type]
}

const comps = ref<Record<string, { exec(p?: any): any }>>({})

defineExpose({
  store,
  run() {
    const value = store.data.stack.reduce((preValue, item) => {
      return comps.value[item.id].exec(preValue)
    }, null)

    return value
  },
})
</script>

<template>
  <Draggable v-model="store.data.stack" item-key="id" class="flex-(~ col) gap-1" group="op-flow">
    <template #item="{ element }">
      <div class="relative">
        <div class="absolute right-0 top-0 transform -translate-x-4px translate-y-4px">
          <span
            class="cursor-pointer bg-white rounded-full color-gray-5 hover:(color-gray-7)"
            @click="store.remove(element.id)"
          >
            <i-carbon-close-outline></i-carbon-close-outline>
          </span>
        </div>
        <Component
          :is="findComp(element.type)"
          :id="element.id"
          :data="element.data"
          :ref="(c: any) => (comps[element.id] = c)"
        ></Component>
      </div>
    </template>
  </Draggable>
</template>
