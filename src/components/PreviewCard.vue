<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  src: string
  frameStyle: Record<string, string>
  imgTransform: string
  scale: number
}>()

const emit = defineEmits<{
  'drag-start': [x: number, y: number]
  'drag-move':  [x: number, y: number]
  'drag-end':   []
  'scale':      [v: number]
}>()

const frameRef = ref<HTMLDivElement | null>(null)
defineExpose({ frameEl: frameRef })
</script>

<template>
  <section class="card">
    <h2 class="card-title">预览与调整</h2>

    <div class="preview-wrapper">
      <div
        ref="frameRef"
        class="preview-frame"
        :style="frameStyle"
        @mousedown.prevent="e => emit('drag-start', e.clientX, e.clientY)"
        @touchstart.passive="e => { if(e.touches.length===1) emit('drag-start', e.touches[0].clientX, e.touches[0].clientY) }"
        @touchmove.prevent="e => { if(e.touches.length===1) emit('drag-move', e.touches[0].clientX, e.touches[0].clientY) }"
      >
        <img
          class="preview-image"
          :src="src"
          :style="{ transform: imgTransform }"
          alt="预览"
          draggable="false"
        />
        <div class="preview-grid" />
      </div>
    </div>

    <div class="controls">
      <span class="control-label">缩放</span>
      <input
        class="scale-range"
        type="range" min="50" max="300"
        :value="Math.round(scale * 100)"
        @input="e => emit('scale', Number((e.target as HTMLInputElement).value))"
      />
      <span class="scale-value">{{ Math.round(scale * 100) }}%</span>
    </div>
  </section>
</template>

<style scoped>
.card { background: #fff; margin: 12px 14px 0; border-radius: 16px; padding: 18px 16px; box-shadow: 0 2px 16px rgba(85,112,241,.08); }
.card-title { font-size: 16px; font-weight: 600; margin: 0 0 14px; }

.preview-wrapper { display: flex; justify-content: center; margin-bottom: 14px; }

.preview-frame {
  position: relative; overflow: hidden;
  border-radius: 8px; border: 2px solid rgba(110,142,245,.55);
  cursor: grab; touch-action: none;
}
.preview-frame:active { cursor: grabbing; }

.preview-image {
  position: absolute; top: 50%; left: 50%;
  width: 100%; height: 100%; object-fit: cover;
  touch-action: none; user-select: none; pointer-events: none;
}

.preview-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px);
  background-size: 33.33% 33.33%;
}

.controls { display: flex; align-items: center; gap: 10px; margin-top: 6px; }
.control-label { font-size: 13px; color: #777; white-space: nowrap; }
.scale-range   { flex: 1; accent-color: #6e8ef5; }
.scale-value   { font-size: 13px; color: #444; min-width: 42px; text-align: right; }
</style>
