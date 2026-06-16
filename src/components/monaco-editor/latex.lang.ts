import { languages } from 'monaco-editor'

export function registerLatex() {
  languages.register({ id: 'latex' })
  languages.setMonarchTokensProvider('latex', {
    tokenizer: {
      root: [
        [/\\[a-zA-Z]+(\{[^}]*\})?/, 'keyword'],
        [/\\./, 'keyword'],
        [/%[^\n]*$/, 'comment'],
        [/\$[^$]*\$/, 'string'],
        [/\$\$[^$]*\$\$/, 'string'],
        [/\\begin\{[^}]*\}/, 'type'],
        [/\\end\{[^}]*\}/, 'type'],
        [/[{}]/, 'delimiter.bracket'],
        [/[^\\${}%]+/, 'source'],
      ],
    },
  })
  languages.setLanguageConfiguration('latex', {
    brackets: [['{', '}']],
    autoClosingPairs: [{ open: '{', close: '}' }],
  })
}
