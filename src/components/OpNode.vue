<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="op op-node border-(~ gray-2) rounded-sm">
    <div class="op-node--title border-(b gray-2) px-2 py-1">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="p-2">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less"></style>
