<script lang="ts" setup>
const props = defineProps<{
  format: string
  data: string
}>()

function dragStart(payload: DragEvent) {
  if (props.format) {
    payload.dataTransfer?.setData(props.format, props.data)
  }
}
</script>

<template>
  <div draggable="true" @dragstart="dragStart">
    <slot></slot>
  </div>
</template>

<style lang="less"></style>
