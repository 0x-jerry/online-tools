<script lang="ts" setup>
import { useFlowStore } from '@/core/store'

const store = useFlowStore()

const props = defineProps<{
  id?: string
}>()

const data = reactive({
  input: '',
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
  <div class="op-input flex gap-2">
    <span> Input: </span>
    <input type="text" v-model="data.input" />
  </div>
</template>

<style lang="less"></style>
