import { inject, type InjectionKey, provide, reactive } from 'vue'
import { uuid } from '@0x-jerry/utils'

export interface OpNode<T = any> {
  id: string
  type: string
  data?: T
}

export type FlowStore = ReturnType<typeof createStore>

export const key = Symbol() as InjectionKey<FlowStore>

function createStore(opt?: { data: any }) {
  const data = reactive({
    stack: [] as OpNode[],
    ...opt,
  })

  return {
    data,
    create(type: string, data?: any) {
      const node: OpNode = {
        id: uuid(),
        type,
        data: data,
      }

      return node
    },
    add(type: string) {
      const node = this.create(type)
      data.stack.push(node)

      return node
    },
    get(id: string) {
      return data.stack.find((n) => n.id === id)
    },
    remove(id: string) {
      const idx = data.stack.findIndex((n) => n.id === id)

      if (idx >= 0) {
        data.stack.splice(idx, 1)
      }
    },
    update<T = any>(id: string, data: T) {
      const o = this.get(id)
      if (o) {
        o.data = data
      }
    },
  }
}

export function provideFlowStore(...args: Parameters<typeof createStore>) {
  const store = createStore(...args)
  provide(key, store)

  return store
}

export function useFlowStore() {
  const store = inject(key, null)

  return store
}
