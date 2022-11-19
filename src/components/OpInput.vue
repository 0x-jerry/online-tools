<script lang="ts" setup>
import { useNodeContext } from '@/core/hooks'
import OpNode from './OpNode.vue'

defineProps<{
  id?: string
  defaultValue?: any
}>()

const data = useNodeContext({
  input: '',
})

defineExpose({
  exec() {
    return data.input
  },
})
</script>

<template>
  <OpNode title="Input" :id="id">
    <input class="w-full" type="text" v-model="data.input" />
  </OpNode>
</template>

<style lang="less"></style>

<docs lang="md">
# Input 操作

输入字符串，用于后续流程使用。
</docs>
