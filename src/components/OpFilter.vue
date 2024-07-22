<script lang="ts" setup>
import { useNodeContext } from '@/core/hooks'
import OpNode from './OpNode.vue'
import { isEmpty, isNumber, isString } from '@0x-jerry/utils'

defineProps<{
  id?: string
  defaultValue?: any
}>()

const filters: Record<string, (n: any) => boolean> = {
  'non empty': (n: any) => !isEmpty(n),
  number: (n: any) => isNumber(n),
  string: (n: any) => isString(n),
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

筛选操作，内置以下规则：

- 非空
- 数字
- 字符串
</docs>
