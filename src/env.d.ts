/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

import type { AttributifyAttributes } from 'unocss/preset-attributify'

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}
