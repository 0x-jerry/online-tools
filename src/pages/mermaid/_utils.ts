/**
 * Export utilities for the Mermaid preview: download the rendered diagram as an
 * SVG file, rasterize it to PNG via OffscreenCanvas, or copy it to the
 * clipboard as a PNG image.
 *
 * Mermaid (v11) renders the diagram as an `<svg width="100%" ... viewBox="0 0 W H">`
 * with no numeric `height`, so the real pixel size must be taken from the `viewBox`.
 */

const PNG_SCALE = 2

/** Trigger a browser download for a Blob. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/** Download an SVG markup string as a `.svg` file. */
export function downloadSvg(svgStr: string, filename: string) {
  const trimmed = svgStr.trim()
  if (!trimmed.startsWith('<svg')) return
  downloadBlob(new Blob([trimmed], { type: 'image/svg+xml;charset=utf-8' }), filename)
}

/** Rasterize an SVG markup string to PNG and download it. */
export async function downloadPng(svgStr: string, filename: string) {
  const png = await svgToPng(svgStr)
  if (png) downloadBlob(png, filename)
}

/** Copy an SVG markup string to the clipboard as a PNG image. */
export async function copyPngToClipboard(svgStr: string) {
  const png = await svgToPng(svgStr)
  if (!png) return
  if (!navigator.clipboard || typeof ClipboardItem === 'undefined') {
    throw new Error('Clipboard image support is unavailable in this browser.')
  }
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': png })])
}

/** Rasterize an SVG markup string to a PNG Blob (or `null` when not possible). */
export async function svgToPng(svgStr: string): Promise<Blob | null> {
  const trimmed = svgStr.trim()
  if (!trimmed.startsWith('<svg')) return null

  const size = svgSize(trimmed)
  if (!size) return null

  const img = await loadSvgImage(trimmed)

  const scale = Math.max(PNG_SCALE, window.devicePixelRatio || 1)
  const canvas = new OffscreenCanvas(Math.round(size.width * scale), Math.round(size.height * scale))
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  return canvas.convertToBlob({ type: 'image/png' })
}

function loadSvgImage(svgStr: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to load the diagram as an image.'))
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr)
  })
}

interface SvgSize {
  width: number
  height: number
}

/** Resolve the SVG's pixel dimensions from its markup. */
function svgSize(svgStr: string): SvgSize | null {
  let width = attrNum(svgStr, 'width')
  let height = attrNum(svgStr, 'height')

  if (!(width > 0 && height > 0)) {
    const vb = /viewBox="([^"]+)"/.exec(svgStr)?.[1]?.trim().split(/[\s,]+/).map(Number)
    if (vb && vb.length === 4 && vb[2] > 0 && vb[3] > 0) {
      width = vb[2]
      height = vb[3]
    }
  }

  if (!(width > 0 && height > 0)) return null
  return { width, height }
}

function attrNum(svgStr: string, name: string): number {
  const m = new RegExp(`${name}="([^"]*)"`).exec(svgStr)
  return m ? Number(m[1]) : NaN
}
