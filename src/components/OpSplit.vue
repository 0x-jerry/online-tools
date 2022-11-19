<script lang="ts" setup>
import { useNodeContext } from '@/core/hooks'
import OpNode from './OpNode.vue'

defineProps<{
  id?: string
  defaultValue?: any
}>()

const data = useNodeContext({
  symbol: '',
})

defineExpose({
  exec(value = '') {
    return String(value).split(data.symbol)
  },
})
</script>

<template>
  <OpNode title="Split" :id="id">
    <input class="w-full" type="text" v-model="data.symbol" />
  </OpNode>
</template>

<style lang="less"></style>

<docs lang="md">
# Split 操作
</docs>
