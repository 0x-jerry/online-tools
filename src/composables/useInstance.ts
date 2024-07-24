import { ref } from 'vue'

export function useInstance<T extends new () => unknown>(_component: T) {
  const i = ref<InstanceType<T>>()

  return i
}
