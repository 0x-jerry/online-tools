<script lang="ts" setup>
import { useNodeContext } from '@/core/hooks'
import { Option } from '@/types'
import OpNode from './OpNode.vue'

defineProps<{
  id?: string
  defaultValue?: any
}>()

enum MatchType {
  Custom = 'custom',
  BuiltIn = 'built-in',
}

/**
 * https://c.runoob.com/front-end/854/
 */
const rules: Option<string | RegExp>[] = [
  {
    label: 'Email',
    value: /\b\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*\b/,
  },
  {
    label: 'Telephone',
    value: /\b(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}\b/,
  },
]

const data = useNodeContext({
  type: MatchType.BuiltIn,
  selectedBuiltIn: rules[0].label,
  regexp: '',
  flags: 'g',
})

function getBuiltInRule(label: string) {
  return rules.find((n) => n.label === label)!
}

defineExpose({
  exec(value = '') {
    const regexp =
      data.type === MatchType.BuiltIn ? getBuiltInRule(data.selectedBuiltIn).value : data.regexp

    const r = new RegExp(regexp, data.flags)

    return String(value).match(r)
  },
})
</script>

<template>
  <OpNode title="Match" :id="id">
    <div class="flex gap-1">
      <select v-model="data.type">
        <option :value="MatchType.BuiltIn">BuiltIn</option>
        <option :value="MatchType.Custom">Custom</option>
      </select>
      <input
        v-if="data.type === MatchType.Custom"
        class="flex-1"
        type="text"
        v-model="data.regexp"
      />
      <select v-if="data.type === MatchType.BuiltIn" class="flex-1" v-model="data.selectedBuiltIn">
        <option v-for="item in rules" :value="item.label">
          {{ item.label }}
        </option>
      </select>
      <input class="w-60px" type="text" v-model="data.flags" />
    </div>
  </OpNode>
</template>

<style lang="less"></style>

<docs lang="md">
# Match 操作
</docs>
