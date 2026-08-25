<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'

export interface CopyIconProps {
  /** Simple text to copy to the clipboard. */
  text?: string
  /** Custom copy handler for non-text formats (e.g. an image). Overrides `text`. */
  copy?: () => Promise<void> | void
  /** Disable the button. */
  disabled?: boolean
  /** Tooltip shown when not copied (defaults to "Copy"). */
  title?: string
}

const props = defineProps<CopyIconProps>()

const { copy: copyText } = useClipboard()
const copied = ref(false)
let timer: ReturnType<typeof setTimeout>

async function doCopy() {
  try {
    if (props.copy) {
      await props.copy()
    } else if (props.text !== undefined) {
      copyText(props.text)
    } else {
      return
    }
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 1500)
  } catch {
    // ignore write failures (e.g. unsupported clipboard formats)
  }
}
</script>

<template>
  <button
    class="copy-icon inline-flex items-center justify-center border-none bg-transparent cursor-pointer text-gray-4 hover:text-gray-6 rounded p-1"
    :disabled="disabled"
    :title="copied ? 'Copied!' : title ?? 'Copy'"
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

  &:hover:not(:disabled) {
    background: #00000010;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
