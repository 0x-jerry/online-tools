<script lang="ts" setup>
defineProps<{
  id?: string
  title: string
}>()
</script>

<template>
  <div class="op op-node border-(1 solid gray-2) rounded-sm bg-white">
    <div class="op-node--title op-node--handle border-(0 b solid gray-2) px-2 py-1">
      <slot name="title">
        <span>
          {{ title }}
          <small class="color-gray-4" v-if="id">{{ id }}</small>
        </span>
      </slot>
    </div>
    <div class="p-2">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.op-node--handle {
  @apply cursor-move;
}
</style>
