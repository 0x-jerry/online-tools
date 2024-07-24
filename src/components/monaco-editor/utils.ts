import { Uri } from 'monaco-editor'

export function createUri(filepath?: string | Uri) {
  if (!filepath) {
    return createUri('Untitled')
  }

  if (typeof filepath === 'string') {
    return Uri.from({
      scheme: 'file',
      path: filepath,
    })
  }

  return filepath
}
