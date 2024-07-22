/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import path from 'path'
import Pages from 'vite-plugin-pages'
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

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        exclude: ['**/components/*.vue', '**/*.ts'],
      }),

      // https://github.com/unocss/unocss
      Unocss({
        content: {
          pipeline: {
            include: [
              //
              /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
              'src/tools.ts',
            ],
          },
        },
      }),
    ],
    test: {
      globals: true,
    },
  }
})
