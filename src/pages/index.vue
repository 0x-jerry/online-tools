<script lang="ts" setup>
import Draggable from 'vuedraggable'
import OpInput from '@/components/OpInput.vue'
import OpSplit from '@/components/OpSplit.vue'
import OpFlow from '@/core/OpFlow.vue'
import { compressText, decompressText } from '@0x-jerry/utils'
import type { Component } from 'vue'
import OpMatch from '@/components/OpMatch.vue'
import OpFilter from '@/components/OpFilter.vue'

interface OpObject {
  type: string
  value: any
}

const router = useRouter()

const route = useRoute()

const URL_PARAM_KEY = 'v'

const flowData = computed(() => {
  const u = (route.query[URL_PARAM_KEY] || '') as string

  if (!u) return null

  try {
    const r = JSON.parse(decompressText(u))
    return r
  } catch (error) {
    return null
  }
})

const opMap: Record<string, Component> = {
  input: OpInput,
  split: OpSplit,
  match: OpMatch,
  filter: OpFilter,
}

const data = shallowReactive({
  selectedComp: null as any,
})

const opObjects: OpObject[] = Object.keys(opMap).map((n) => ({ type: n, value: null }))

const flow = ref<InstanceType<typeof OpFlow>>()

const output = ref<any>('')

function run() {
  if (!flow.value) return

  const v = flow.value.run()

  output.value = typeof v === 'object' ? JSON.stringify(v, null, 2) : v

  // update url
  const conf = compressText(JSON.stringify(flow.value.store.data))
  router.push({
    query: {
      [URL_PARAM_KEY]: conf,
    },
  })
}

function cloneNode(value: OpObject) {
  return flow.value?.store.create(value.type, value.value)
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
            <span class="cursor-pointer color-gray-5 hover:(color-gray-7)" @click="run">
              <i-carbon-play></i-carbon-play>
            </span>
          </span>
        </div>
        <OpFlow class="flex-(~ 1 col) gap-2 px-2 pt-2" :ops="opMap" ref="flow" :data="flowData">
        </OpFlow>
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
      <Draggable
        class="px-2 flex-(~ 1 col) gap-2"
        :model-value="opObjects"
        item-key="type"
        handle=".op-node--handle"
        :group="{ name: 'op-flow', pull: 'clone', put: false }"
        :clone="cloneNode"
      >
        <template #item="{ element }">
          <span @click="data.selectedComp = opMap[element.type]">
            <Component
              :is="opMap[element.type]"
              @update:value="(v: any) => element.value = v"
            ></Component>
          </span>
        </template>
      </Draggable>
    </div>
    <div class="flex-1">
      <div class="box-title">Description</div>
      <div class="markdown-body p-2" v-if="data.selectedComp" v-html="data.selectedComp.docs"></div>
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
