<script lang="ts" setup>
import { useFlowStore } from '@/core/store'

const store = useFlowStore()

const props = defineProps<{
  id?: string
}>()

const data = reactive({
  symbol: '',
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
  <div class="op-split flex gap-2">
    <span> Split Symbol: </span>
    <input type="text" v-model="data.symbol" />
  </div>
</template>

<style lang="less"></style>
