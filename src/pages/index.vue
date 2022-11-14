<script lang="ts" setup>
import DraggableItem from '@/components/DraggableItem.vue'
import OpInput from '@/components/OpInput.vue'
import OpSplit from '@/components/OpSplit.vue'
import OpFlow from '@/core/OpFlow.vue'

const opMap = {
  input: OpInput,
  split: OpSplit,
}

const flow = ref<InstanceType<typeof OpFlow>>()

const output = ref<any>('')

function run() {
  const v = flow.value?.run()

  output.value = typeof v === 'object' ? JSON.stringify(v, null, 2) : v
}

useEventListener('keydown', (e) => {
  if (e.metaKey && e.key === 'Enter') {
    run()
  }
})
</script>

<template>
  <div class="flex w-screen h-screen">
    <div class="w-400px border-(r gray-2) flex-(~ col)">
      <div class="flex-(~ 1 col)">
        <div class="box-title">
          <span class="flex-1"> Stack </span>
          <span>
            <span class="cursor-pointer" @click="run">
              <i-carbon-play></i-carbon-play>
            </span>
          </span>
        </div>
        <OpFlow class="flex-1" :ops="opMap" ref="flow"> </OpFlow>
      </div>

      <div class="h-200px border-(t gray-2)">
        <div class="box-title">Output</div>
        <div>
          {{ output }}
        </div>
      </div>
    </div>
    <div class="w-400px border-(r gray-2) flex-(~ col) gap-2">
      <div class="box-title">Operations</div>
      <DraggableItem v-for="(value, key) in opMap" format="op" :data="key">
        <component :is="value"></component>
      </DraggableItem>
    </div>
    <div class="flex-1">
      <div class="box-title">Description</div>
    </div>
  </div>
</template>

<style lang="less">
.box-title {
  @apply bg-gray-1 py-1 px-2 border-(b gray-2) flex;
}

html,
body {
  @apply color-gray-7;
}
</style>
