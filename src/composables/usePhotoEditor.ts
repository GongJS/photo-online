import { ref, computed, onMounted } from 'vue'
import { removeBackground, preload } from '@imgly/background-removal'
import { SIZES, BG_COLORS } from '@/types'
import type { SizeKey, ColorKey, StatusState } from '@/types'

const PREVIEW_H = 290
const RESULT_H  = 260

export function usePhotoEditor() {
  // ── 页面挂载后静默预加载模型 ──
  onMounted(() => {
    requestIdleCallback(() => {
      preload({ model: 'isnet_fp16' }).catch(() => {})
    })
  })

  // ── Selections ──
  const selectedSize  = ref<SizeKey>('one')
  const selectedColor = ref<ColorKey>('blue')

  // ── Status ──
  const statusVisible  = ref(false)
  const statusState    = ref<StatusState>('loading')
  const statusMessage  = ref('')

  // ── Transparent image (after AI) ──
  const transparentImg = ref<HTMLImageElement | null>(null)
  const previewSrc     = ref('')
  const showPreview    = ref(false)

  // ── Drag / zoom state ──
  const scale   = ref(1)
  const offsetX = ref(0)
  const offsetY = ref(0)
  let isDragging  = false
  let startX      = 0
  let startY      = 0
  let startOX     = 0
  let startOY     = 0

  // ── Result ──
  const resultDataURL = ref('')
  const showResult    = ref(false)

  // ── Computed styles ──
  const previewFrameStyle = computed(() => {
    const { w, h } = SIZES[selectedSize.value]
    return {
      width:           `${Math.round(PREVIEW_H * w / h)}px`,
      height:          `${PREVIEW_H}px`,
      backgroundColor: BG_COLORS[selectedColor.value].value,
    }
  })

  const previewImgTransform = computed(
    () => `translate(calc(-50% + ${offsetX.value}px), calc(-50% + ${offsetY.value}px)) scale(${scale.value})`,
  )

  const resultImgStyle = computed(() => {
    const { w, h } = SIZES[selectedSize.value]
    return {
      height: `${RESULT_H}px`,
      width:  `${Math.round(RESULT_H * w / h)}px`,
    }
  })

  // ── Image processing ──
  async function processImage(file: File) {
    statusVisible.value = true
    statusState.value   = 'loading'
    statusMessage.value = '正在初始化 AI 模型...'
    showPreview.value   = false
    showResult.value    = false

    try {
      const blob = await removeBackground(file, {
        model: 'isnet_fp16',
        progress: (_key: string, loaded: number, total: number) => {
          if (total > 0)
            statusMessage.value = `正在加载模型：${Math.round((loaded / total) * 100)}%`
        },
      })

      const url = URL.createObjectURL(blob)
      const img = new Image()
      await new Promise<void>((res, rej) => {
        img.onload = () => res()
        img.onerror = rej
        img.src = url
      })
      transparentImg.value = img

      statusState.value   = 'done'
      statusMessage.value = '抠图完成！在下方拖动 / 缩放后点击生成'

      scale.value   = 1
      offsetX.value = 0
      offsetY.value = 0
      previewSrc.value = url
      showPreview.value = true
    } catch (err: unknown) {
      statusState.value   = 'error'
      statusMessage.value = '处理失败：' + (err instanceof Error ? err.message : String(err))
    }
  }

  // ── Generate ──
  function generate(frameRect: DOMRect) {
    const img = transparentImg.value
    if (!img) return

    const { w: CW, h: CH } = SIZES[selectedSize.value]
    const bgColor = BG_COLORS[selectedColor.value].value

    const canvas = document.createElement('canvas')
    canvas.width  = CW
    canvas.height = CH
    const ctx = canvas.getContext('2d')!

    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, CW, CH)

    const imgRatio    = img.naturalWidth / img.naturalHeight
    const canvasRatio = CW / CH
    let baseW: number, baseH: number
    if (imgRatio > canvasRatio) {
      baseH = CH; baseW = baseH * imgRatio
    } else {
      baseW = CW; baseH = baseW / imgRatio
    }
    const drawW = baseW * scale.value
    const drawH = baseH * scale.value
    const dx = (CW - drawW) / 2 + offsetX.value * (CW / frameRect.width)
    const dy = (CH - drawH) / 2 + offsetY.value * (CH / frameRect.height)

    ctx.drawImage(img, dx, dy, drawW, drawH)

    resultDataURL.value = canvas.toDataURL('image/png')
    showResult.value    = true
  }

  // ── Download ──
  function download() {
    if (!resultDataURL.value) return
    const a = document.createElement('a')
    a.href     = resultDataURL.value
    a.download = `证件照_${SIZES[selectedSize.value].label}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // ── Drag handlers ──
  function onDragStart(x: number, y: number) {
    isDragging = true
    startX = x; startY = y
    startOX = offsetX.value; startOY = offsetY.value
  }
  function onDragMove(x: number, y: number) {
    if (!isDragging) return
    offsetX.value = startOX + (x - startX)
    offsetY.value = startOY + (y - startY)
  }
  function onDragEnd() { isDragging = false }

  return {
    selectedSize, selectedColor,
    statusVisible, statusState, statusMessage,
    previewSrc, showPreview,
    scale, offsetX, offsetY,
    resultDataURL, showResult,
    previewFrameStyle, previewImgTransform, resultImgStyle,
    processImage, generate, download,
    onDragStart, onDragMove, onDragEnd,
  }
}
