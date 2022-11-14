<script lang="ts" setup>
import { useFlowStore } from '@/core/store'
import OpNode from './OpNode.vue'

const store = useFlowStore()

const props = defineProps<{
  id?: string
  data?: string
}>()

const data = reactive({
  symbol: props.data || '',
})

watch(
  () => data.symbol,
  (v) => {
    if (!props.id) return

    store?.update(props.id, v)
  },
)

defineExpose({
  exec(value = '') {
    return String(value).split(data.symbol)
  },
})
</script>

<template>
  <OpNode title="Split">
    <input type="text" v-model="data.symbol" />
  </OpNode>
</template>

<style lang="less"></style>
