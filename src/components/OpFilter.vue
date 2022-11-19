<script lang="ts" setup>
import { useNodeContext } from '@/core/hooks'
import { is } from '@0x-jerry/utils'
import OpNode from './OpNode.vue'

defineProps<{
  id?: string
  defaultValue?: any
}>()

const filters: Record<string, (n: any) => boolean> = {
  'non empty': (n: any) => !is.empty(n),
  number: (n: any) => is.number(n),
  string: (n: any) => is.string(n),
}

const keys = Object.keys(filters)

const data = useNodeContext({
  type: keys[0],
})

defineExpose({
  exec(value = []) {
    const filter = filters[data.type]
    return filter ? value.filter(filter) : value
  },
})
</script>

<template>
  <OpNode title="Filter" :id="id">
    <label class="flex items-center gap-1">
      <span> Condition: </span>
      <select v-model="data.type" class="flex-1">
        <option v-for="item in keys" :value="item">{{ item }}</option>
      </select>
    </label>
  </OpNode>
</template>

<style lang="less"></style>

<docs lang="md">
# Filter 操作
</docs>
