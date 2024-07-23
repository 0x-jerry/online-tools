import { ref } from 'vue'

export function useInstance<T extends new () => any>(_component: T) {
  const i = ref<InstanceType<T>>()

  return i
}
