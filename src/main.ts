import { type Plugin, createApp } from 'vue'
import App from './App.vue'

import 'github-markdown-css'
import 'normalize.css'
import './styles/global.less'
import 'uno.css'
import { Buffer } from 'buffer'

// polyfill
window.Buffer = Buffer

const app = createApp(App)

// install all modules
const modules = Object.values(
  import.meta.glob<{ install: Plugin }>('./modules/*.ts', { eager: true }),
)

for (const module of modules) {
  app.use(module.install)
}

app.mount('#app')
