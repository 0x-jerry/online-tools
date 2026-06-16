import { type Plugin, createApp } from 'vue'
import App from './App.vue'

import 'github-markdown-css/github-markdown.css'
import 'katex/dist/katex.min.css'
import 'normalize.css'
import './styles/global.less'
import 'uno.css'
import { registerLatex } from '@/components/monaco-editor/latex.lang'
import { Buffer } from 'buffer'

// @ts-ignore polyfill
window.Buffer = Buffer

registerLatex()

const app = createApp(App)

// install all modules
const modules = Object.values(
  import.meta.glob<{ install: Plugin }>('./modules/*.ts', { eager: true }),
)

for (const module of modules) {
  app.use(module.install)
}

app.mount('#app')
