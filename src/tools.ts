export interface ToolManifest {
  hide?: boolean
  name: string
  route: string
  description?: string

  /**
   * https://icones.js.org/collection/carbon
   */
  icon?: string

  /**
   * auto generate at runtime
   */
  id?: string
}

export const allTools: ToolManifest[] = [
  {
    name: 'Welcome',
    route: '/',
    icon: 'i-carbon:home',
  },
  {
    name: 'Validate JSON Schema',
    route: '/json-schema/validator',
    icon: 'i-carbon:json',
  },
  {
    name: 'Markdown Preview',
    route: '/markdown',
    icon: 'i-carbon:document',
  },
  {
    name: 'Latex Preview',
    route: '/latex',
    icon: 'i-carbon:math-curve',
  },
  {
    name: 'Mermaid Preview',
    route: '/mermaid',
    icon: 'i-carbon:flow',
  },
]

allTools.forEach((item, idx) => {
  item.id = idx.toString()
})

export const visibleTools = allTools.filter((n) => n.hide !== true)
