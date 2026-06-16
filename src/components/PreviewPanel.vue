<script lang="ts" setup>
import { computed, nextTick, onUnmounted, reactive, ref } from 'vue'

const props = withDefaults(defineProps<{ minScale?: number; maxScale?: number }>(), {
  minScale: 0.1,
  maxScale: 10,
})

const container = ref<HTMLElement>()
const contentEl = ref<HTMLElement>()

const state = reactive({
  scale: 1,
  offsetX: 0,
  offsetY: 0,
})

const isDragging = ref(false)
const lastX = ref(0)
const lastY = ref(0)

const contentStyle = computed(() => ({
  transform: `translate(${state.offsetX}px, ${state.offsetY}px) scale(${state.scale})`,
  transformOrigin: '0 0',
}))

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

function onWheel(e: WheelEvent) {
  e.preventDefault()
  const rect = container.value!.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  const delta = e.deltaY < 0 ? 1.1 : 0.9
  const newScale = clamp(state.scale * delta, props.minScale, props.maxScale)
  const ratio = newScale / state.scale
  state.offsetX = mx - ratio * (mx - state.offsetX)
  state.offsetY = my - ratio * (my - state.offsetY)
  state.scale = newScale
}

function onMouseDown(e: MouseEvent) {
  if (e.button !== 0 && e.button !== 1) return
  e.preventDefault()
  isDragging.value = true
  lastX.value = e.clientX
  lastY.value = e.clientY
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return
  state.offsetX += e.clientX - lastX.value
  state.offsetY += e.clientY - lastY.value
  lastX.value = e.clientX
  lastY.value = e.clientY
}

function onMouseUp() {
  isDragging.value = false
}

function zoomIn() {
  const el = container.value
  if (!el) return
  const cx = el.clientWidth / 2
  const cy = el.clientHeight / 2
  const newScale = clamp(state.scale * 1.2, props.minScale, props.maxScale)
  const ratio = newScale / state.scale
  state.offsetX = cx - ratio * (cx - state.offsetX)
  state.offsetY = cy - ratio * (cy - state.offsetY)
  state.scale = newScale
}

function zoomOut() {
  const el = container.value
  if (!el) return
  const cx = el.clientWidth / 2
  const cy = el.clientHeight / 2
  const newScale = clamp(state.scale / 1.2, props.minScale, props.maxScale)
  const ratio = newScale / state.scale
  state.offsetX = cx - ratio * (cx - state.offsetX)
  state.offsetY = cy - ratio * (cy - state.offsetY)
  state.scale = newScale
}

async function reset() {
  state.scale = 1
  state.offsetX = 0
  state.offsetY = 0
  await nextTick()
  const el = container.value
  const inner = contentEl.value
  if (!el || !inner) return
  const iw = inner.scrollWidth
  const ih = inner.scrollHeight
  state.offsetX = (el.clientWidth - iw) / 2
  state.offsetY = (el.clientHeight - ih) / 2
}

onUnmounted(() => {
  isDragging.value = false
})

defineExpose({ reset, state })
</script>

<template>
  <div
    ref="container"
    class="preview-panel relative size-full overflow-hidden"
    :class="{ 'cursor-grab': !isDragging, 'cursor-grabbing': isDragging }"
    @wheel="onWheel"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
  >
    <div ref="contentEl" class="absolute" :style="contentStyle">
      <slot />
    </div>
    <div class="absolute top-2 right-2 flex gap-1 bg-white/80 rounded shadow-sm">
      <button class="btn" title="Zoom in" @click="zoomIn">+</button>
      <button class="btn" title="Zoom out" @click="zoomOut">&minus;</button>
      <button class="btn" title="Reset" @click="reset">&#8634;</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #555;
  font-size: 14px;
  border-radius: 4px;

  &:hover {
    background: #00000010;
  }
}
</style>
