import { createApp, Plugin } from 'vue'
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
Object.values(import.meta.glob<{ install: Plugin }>('./modules/*.ts', { eager: true })).forEach(
  (m) => {
    app.use(m.install)
  },
)

app.mount('#app')
