<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps<{ text: string }>()

const { copy } = useClipboard({ legacy: true })
const copied = ref(false)
let timer: ReturnType<typeof setTimeout>

function doCopy() {
  copy(props.text)
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => { copied.value = false }, 1500)
}
</script>

<template>
  <button
    class="copy-icon inline-flex items-center justify-center border-none bg-transparent cursor-pointer text-gray-4 hover:text-gray-6 rounded p-1"
    :title="copied ? 'Copied!' : 'Copy'"
    @click="doCopy"
  >
    <i v-if="copied" class="i-carbon:checkmark text-green-5" />
    <i v-else class="i-carbon:copy" />
  </button>
</template>

<style lang="less" scoped>
.copy-icon {
  width: 28px;
  height: 28px;
  font-size: 16px;

  &:hover {
    background: #00000010;
  }
}
</style>
