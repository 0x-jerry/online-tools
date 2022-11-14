export function createDragEvent(format: string, data: string) {
  return function (e: DragEvent) {
    e.dataTransfer?.setData(format, data)
  }
}
