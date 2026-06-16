import {
  defineConfig,
  presetIcons,
  presetMini,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [presetMini(), presetIcons()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
