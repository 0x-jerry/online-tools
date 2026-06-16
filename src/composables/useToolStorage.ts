import { useLocalStorage } from '@vueuse/core'
import { useRoute } from 'vue-router'

export function useToolStorage<T>(defaultValue: T, key?: string) {
  const route = useRoute()
  const storageKey = `tool-state:${route.path}:${key ?? ''}`
  return useLocalStorage<T>(storageKey, defaultValue)
}
