<script lang="ts" setup>
import { useNodeContext } from '@/core/hooks'
import OpNode from './OpNode.vue'

defineProps<{
  id?: string
  data?: any
}>()

const data = useNodeContext({
  regexp: '',
  flags: 'g',
})

defineExpose({
  exec(value = '') {
    const r = new RegExp(data.regexp, data.flags)
    return String(value).match(r)
  },
})
</script>

<template>
  <OpNode title="Match" :id="id">
    <div class="flex gap-1">
      <input class="flex-1" type="text" v-model="data.regexp" />
      <input class="w-60px" type="text" v-model="data.flags" />
    </div>
  </OpNode>
</template>

<style lang="less"></style>

<docs lang="md">
# Match 操作
</docs>
