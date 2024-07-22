/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import path from 'path'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { DocsBlock } from './vite/DocsBlock'

// https://vitejs.dev/config/
export default defineConfig(({}) => {
  return {
    base: './',
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      Vue(),

      DocsBlock(),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: 'src/auto-components.d.ts',
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        exclude: ['**/components/*.vue', '**/*.ts'],
      }),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        dts: 'src/auto-imports.d.ts',
        imports: ['vue', 'vue-router', '@vueuse/core'],
      }),

      // https://github.com/unocss/unocss
      Unocss(),
    ],
    test: {
      globals: true,
    },
  }
})
