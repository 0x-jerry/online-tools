import { languages } from 'monaco-editor'

export function registerMermaid() {
  languages.register({ id: 'mermaid' })
  languages.setMonarchTokensProvider('mermaid', {
    keywords: [
      'graph',
      'flowchart',
      'sequenceDiagram',
      'classDiagram',
      'stateDiagram',
      'stateDiagram-v2',
      'erDiagram',
      'gantt',
      'pie',
      'gitGraph',
      'mindmap',
      'timeline',
      'C4Context',
      'quadrantChart',
      'journey',
      'TD',
      'TB',
      'LR',
      'RL',
      'BT',
      'end',
      'participant',
      'actor',
      'loop',
      'alt',
      'else',
      'opt',
      'par',
      'and',
      'rect',
      'activate',
      'deactivate',
      'note',
      'over',
      'left',
      'right',
      'section',
      'title',
      'dateFormat',
      'axisFormat',
    ],
    tokenizer: {
      root: [
        [/%%[^\n]*$/, 'comment'],
        [
          /\b[a-zA-Z_]\w*\b/,
          {
            cases: {
              '@keywords': 'keyword',
              '@default': 'identifier',
            },
          },
        ],
        [/"[^"]*"/, 'string'],
        [/\|\|[^|]+\|\|/, 'string'],
        [/[{}[\]]/, 'delimiter.bracket'],
        [/[|>\(\)\-]+/, 'delimiter'],
        [/:.+$/, 'type'],
      ],
    },
  })
}
