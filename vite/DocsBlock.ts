import * as marked from 'marked'
import { Plugin } from 'vite'

export const DocsBlock = () => {
  const plugin: Plugin = {
    name: 'docs-block',
    transform(code, id) {
      if (!/vue&type=docs/.test(id)) {
        return
      }

      const rendered = marked.marked(code)

      return `export default Comp => {
        Comp.docs = ${JSON.stringify(rendered)}
      }`
    },
  }

  return plugin
}
