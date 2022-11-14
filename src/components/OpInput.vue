<script lang="ts" setup>
import { useNodeContext } from '@/core/hooks'
import OpNode from './OpNode.vue'

defineProps<{
  id?: string
  data?: any
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
