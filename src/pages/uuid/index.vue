<script lang="ts" setup>
import CopyIcon from '@/components/CopyIcon.vue'
import { useToolStorage } from '@/composables/useToolStorage'
import { ref } from 'vue'
import { v1, v3, v4, v5, v6, v7, NIL as nilUUID } from 'uuid'

type UuidVersion = 'v1' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7'

interface UuidItem {
  id: number
  value: string
}

const STANDARD_NAMESPACES: Record<string, { label: string; value: string }> = {
  DNS: { label: 'DNS', value: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' },
  URL: { label: 'URL', value: '6ba7b811-9dad-11d1-80b4-00c04fd430c8' },
  OID: { label: 'OID', value: '6ba7b812-9dad-11d1-80b4-00c04fd430c8' },
  X500: { label: 'X.500', value: '6ba7b814-9dad-11d1-80b4-00c04fd430c8' },
}

const version = useToolStorage<UuidVersion>('v4', 'version')
const count = useToolStorage(1, 'count')
const namespace = useToolStorage('DNS', 'namespace')
const customNamespace = useToolStorage('', 'customNamespace')
const nameInput = useToolStorage('', 'name')

const uuidItems = ref<UuidItem[]>([])
const error = ref('')

const versions: { value: UuidVersion; label: string }[] = [
  { value: 'v1', label: 'v1 (time-based)' },
  { value: 'v3', label: 'v3 (MD5 hash)' },
  { value: 'v4', label: 'v4 (random)' },
  { value: 'v5', label: 'v5 (SHA-1 hash)' },
  { value: 'v6', label: 'v6 (reordered time)' },
  { value: 'v7', label: 'v7 (Unix Epoch time)' },
]

function getNamespaceUuid(): string {
  if (namespace.value === 'custom') return customNamespace.value
  return STANDARD_NAMESPACES[namespace.value]?.value ?? nilUUID
}

function generate() {
  error.value = ''
  uuidItems.value = []

  const n = Math.max(1, Math.min(100, count.value))

  try {
    for (let i = 0; i < n; i++) {
      let val: string
      switch (version.value) {
        case 'v1':
          val = v1()
          break
        case 'v3':
          val = v3(nameInput.value || 'example', getNamespaceUuid())
          break
        case 'v4':
          val = v4()
          break
        case 'v5':
          val = v5(nameInput.value || 'example', getNamespaceUuid())
          break
        case 'v6':
          val = v6()
          break
        case 'v7':
          val = v7()
          break
      }
      uuidItems.value.push({ id: i, value: val })
    }
  } catch (e: unknown) {
    error.value = String(e)
  }
}

const needsNamespace = () => version.value === 'v3' || version.value === 'v5'
</script>

<template>
  <div class="flex h-full">
    <div class="w-56 border-(0 r solid gray-2) flex flex-col p-4 gap-4 shrink-0">
      <div class="text-sm text-gray-5">
        <div class="mb-1">Version</div>
        <select
          v-model="version"
          class="w-full px-2 py-1 border-(1 solid gray-3) rounded text-sm bg-white"
        >
          <option v-for="v in versions" :key="v.value" :value="v.value">
            {{ v.label }}
          </option>
        </select>
      </div>

      <template v-if="needsNamespace()">
        <div class="text-sm text-gray-5">
          <div class="mb-1">Namespace</div>
          <select
            v-model="namespace"
            class="w-full px-2 py-1 border-(1 solid gray-3) rounded text-sm bg-white"
          >
            <option v-for="(ns, key) in STANDARD_NAMESPACES" :key="key" :value="key">
              {{ ns.label }}
            </option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div v-if="namespace === 'custom'" class="text-sm text-gray-5">
          <div class="mb-1">NS UUID</div>
          <input
            v-model="customNamespace"
            class="w-full px-2 py-1 border-(1 solid gray-3) rounded text-sm"
            placeholder="00000000-0000-0000-0000-000000000000"
          />
        </div>

        <div class="text-sm text-gray-5">
          <div class="mb-1">Name</div>
          <input
            v-model="nameInput"
            class="w-full px-2 py-1 border-(1 solid gray-3) rounded text-sm"
            placeholder="example"
          />
        </div>
      </template>

      <div class="text-sm text-gray-5">
        <div class="mb-1">Count</div>
        <input
          v-model.number="count"
          type="number"
          min="1"
          max="100"
          class="w-full px-2 py-1 border-(1 solid gray-3) rounded text-sm"
        />
      </div>

      <button
        class="w-full px-4 py-1.5 bg-blue-5 text-white rounded text-sm hover:bg-blue-6 active:bg-blue-7"
        @click="generate"
      >
        Generate
      </button>
    </div>

    <div class="flex-1 overflow-auto p-4">
      <div v-if="error" class="text-red-5 mb-3 text-sm">{{ error }}</div>

      <div v-if="uuidItems.length > 0" class="flex flex-col gap-2">
        <div class="flex items-center mb-1">
          <span class="text-sm text-gray-4">{{ uuidItems.length }} UUID{{ uuidItems.length > 1 ? 's' : '' }}</span>
        </div>

        <div
          v-for="item in uuidItems"
          :key="item.id"
          class="flex items-center gap-2 group"
        >
          <code class="flex-1 text-sm font-mono p-2 bg-gray-1 rounded">{{ item.value }}</code>
          <CopyIcon class="shrink-0" :text="item.value" />
        </div>
      </div>

      <div
        v-else
        class="text-gray-4 text-sm text-center mt-20"
      >
        Select options and click Generate
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
