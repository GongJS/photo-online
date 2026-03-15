<script setup lang="ts">
import { nextTick, ref } from 'vue'
import AppHeader     from '@/components/AppHeader.vue'
import SizeSelector  from '@/components/SizeSelector.vue'
import ColorSelector from '@/components/ColorSelector.vue'
import UploadCard    from '@/components/UploadCard.vue'
import StatusCard    from '@/components/StatusCard.vue'
import PreviewCard   from '@/components/PreviewCard.vue'
import ResultCard    from '@/components/ResultCard.vue'
import BottomBar     from '@/components/BottomBar.vue'
import { usePhotoEditor } from '@/composables/usePhotoEditor'

const previewCardRef = ref<InstanceType<typeof PreviewCard> | null>(null)
const resultCardRef  = ref<InstanceType<typeof ResultCard>  | null>(null)

const {
  selectedSize, selectedColor,
  statusVisible, statusState, statusMessage,
  previewSrc, showPreview,
  scale,
  resultDataURL, showResult,
  previewFrameStyle, previewImgTransform, resultImgStyle,
  processImage, generate, download,
  onDragStart, onDragMove, onDragEnd,
} = usePhotoEditor()

function handleGenerate() {
  const frameEl = previewCardRef.value?.frameEl
  if (!frameEl) {
    alert('请先上传并处理照片')
    return
  }
  generate(frameEl.getBoundingClientRect())
  nextTick(() => {
    resultCardRef.value?.$el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  })
}

function handleFile(file: File) {
  processImage(file).then(() => {
    nextTick(() => {
      previewCardRef.value?.$el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  })
}
</script>

<template>
  <div
    class="page"
    @mousemove="e => onDragMove(e.clientX, e.clientY)"
    @mouseup="onDragEnd"
    @touchend="onDragEnd"
    @touchcancel="onDragEnd"
  >
    <div class="app">
      <AppHeader />

      <SizeSelector v-model="selectedSize" />
      <ColorSelector v-model="selectedColor" />
      <UploadCard @file="handleFile" />

      <StatusCard
        v-if="statusVisible"
        :state="statusState"
        :message="statusMessage"
      />

      <PreviewCard
        v-if="showPreview"
        ref="previewCardRef"
        :src="previewSrc"
        :frame-style="previewFrameStyle"
        :img-transform="previewImgTransform"
        :scale="scale"
        @drag-start="onDragStart"
        @drag-move="onDragMove"
        @drag-end="onDragEnd"
        @scale="v => { scale = v / 100 }"
      />

      <ResultCard
        v-if="showResult"
        ref="resultCardRef"
        :data-u-r-l="resultDataURL"
        :img-style="resultImgStyle"
        @download="download"
      />
    </div>

    <BottomBar @generate="handleGenerate" />
  </div>
</template>

<style scoped>
.page { min-height: 100vh; }
.app  { max-width: 480px; margin: 0 auto; padding-bottom: 90px; }
</style>
