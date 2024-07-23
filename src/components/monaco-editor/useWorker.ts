import { languages } from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

self.MonacoEnvironment = {
  async getWorker(_, label: string) {
    if (label === 'json') {
      const jsonWorker = (await import('monaco-editor/esm/vs/language/json/json.worker?worker'))
        .default
      return new jsonWorker()
    }

    if (label === 'css' || label === 'scss' || label === 'less') {
      const cssWorker = (await import('monaco-editor/esm/vs/language/css/css.worker?worker'))
        .default
      return new cssWorker()
    }

    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      const htmlWorker = (await import('monaco-editor/esm/vs/language/html/html.worker?worker'))
        .default
      return new htmlWorker()
    }

    if (label === 'typescript' || label === 'javascript') {
      const tsWorker = (await import('monaco-editor/esm/vs/language/typescript/ts.worker?worker'))
        .default
      return new tsWorker()
    }

    return new editorWorker()
  },
}

languages.typescript.typescriptDefaults.setEagerModelSync(true)
