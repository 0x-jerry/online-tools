<script lang="ts" setup>
import { useFlowStore } from '@/core/store'
import OpNode from './OpNode.vue'

const store = useFlowStore()

const props = defineProps<{
  id?: string
  data?: string
}>()

const data = reactive({
  input: props.data || '',
})

watch(
  () => data.input,
  (v) => {
    if (!props.id) return

    store?.update(props.id, v)
  },
)

defineExpose({
  exec() {
    return data.input
  },
})
</script>

<template>
  <OpNode title="Input" :id="id">
    <input type="text" v-model="data.input" />
  </OpNode>
</template>

<style lang="less"></style>
