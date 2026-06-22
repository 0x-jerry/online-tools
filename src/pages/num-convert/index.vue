<script lang="ts" setup>
import CopyIcon from '@/components/CopyIcon.vue'
import { useToolStorage } from '@/composables/useToolStorage'
import { computed, ref } from 'vue'

const sourceBase = useToolStorage<number>(10, 'sourceBase')
const sourceValue = useToolStorage('', 'sourceValue')
const error = ref('')

const BASES = [
  { label: 'Binary (2)', value: 2 },
  { label: 'Octal (8)', value: 8 },
  { label: 'Decimal (10)', value: 10 },
  { label: 'Hexadecimal (16)', value: 16 },
  { label: 'Custom', value: 0 },
]

const customBase = useToolStorage<number>(3, 'customBase')

const effectiveBase = computed(() => {
  return sourceBase.value === 0 ? customBase.value : sourceBase.value
})

function basePrefix(base: number): string {
  if (base === 2) return '0b'
  if (base === 8) return '0o'
  if (base === 16) return '0x'
  return ''
}

function baseDigits(base: number): RegExp {
  if (base <= 10) {
    return new RegExp(`^[0-${base - 1}]+$`, 'i')
  }
  const maxDigit = (base - 1).toString(base).toUpperCase()
    return new RegExp(`^[0-9A-${maxDigit}]+$`, 'i')
}

const decimalValue = computed<number | null>(() => {
  error.value = ''
  if (!sourceValue.value.trim()) return null
  const base = effectiveBase.value
  if (base < 2 || base > 36) {
    error.value = 'Base must be between 2 and 36'
    return null
  }
  const cleaned = sourceValue.value.trim().replace(/\s+/g, '')
  if (!baseDigits(base).test(cleaned)) {
    error.value = `Invalid digits for base ${base}`
    return null
  }
  return parseInt(cleaned, base)
})

interface ConversionResult {
  base: number
  label: string
  value: string
}

const results = computed<ConversionResult[]>(() => {
  if (decimalValue.value === null) return []
  const val = decimalValue.value
  const targets = [2, 8, 10, 16]
  return targets.map((base) => {
    const prefix = basePrefix(base)
    const formatted = val.toString(base).toUpperCase()
    return {
      base,
      label: `Base ${base}`,
      value: prefix ? `${prefix}${formatted}` : formatted,
    }
  })
})
</script>

<template>
  <div class="flex h-full">
    <div class="w-56 border-(0 r solid gray-2) flex flex-col p-4 gap-4 shrink-0">
      <div class="text-sm text-gray-5">
        <div class="mb-1">Source Base</div>
        <select
          v-model="sourceBase"
          class="w-full px-2 py-1 border-(1 solid gray-3) rounded text-sm bg-white"
        >
          <option v-for="b in BASES" :key="b.value" :value="b.value">
            {{ b.label }}
          </option>
        </select>
      </div>

      <div v-if="sourceBase === 0" class="text-sm text-gray-5">
        <div class="mb-1">Custom Base (2-36)</div>
        <input
          v-model.number="customBase"
          type="number"
          min="2"
          max="36"
          class="w-full px-2 py-1 border-(1 solid gray-3) rounded text-sm"
        />
      </div>

      <div class="text-sm text-gray-5">
        <div class="mb-1">Number</div>
        <input
          v-model="sourceValue"
          class="w-full px-2 py-1 border-(1 solid gray-3) rounded text-sm font-mono"
          placeholder="Enter number..."
          @keyup.enter
        />
      </div>

      <div class="text-xs text-gray-4">
        <p>Supports bases 2–36. For bases &gt;10, digits A-Z are used.</p>
      </div>
    </div>

    <div class="flex-1 overflow-auto p-4">
      <div v-if="error" class="text-red-5 mb-3 text-sm">{{ error }}</div>

      <div v-if="results.length > 0 && !error" class="flex flex-col gap-2">
        <div v-for="r in results" :key="r.base" class="flex items-center gap-2 group">
          <span class="w-24 text-sm text-gray-5 shrink-0">{{ r.label }}</span>
          <code class="flex-1 text-sm font-mono p-2 bg-gray-1 rounded">{{ r.value }}</code>
          <CopyIcon class="shrink-0" :text="r.value" />
        </div>
      </div>

      <div
        v-else-if="!error"
        class="text-gray-4 text-sm text-center mt-20"
      >
        Enter a number to see conversions
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
