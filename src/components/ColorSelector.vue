<script setup lang="ts">
import { BG_COLORS } from '@/types'
import type { ColorKey } from '@/types'

const props = defineProps<{ modelValue: ColorKey }>()
const emit  = defineEmits<{ 'update:modelValue': [v: ColorKey] }>()

const colorList = Object.entries(BG_COLORS) as [ColorKey, (typeof BG_COLORS)[ColorKey]][]
</script>

<template>
  <section class="card">
    <h2 class="card-title">选择底色</h2>
    <div class="color-row">
      <div v-for="[key, cfg] in colorList" :key="key" class="color-item">
        <button
          class="color-dot"
          :class="{ active: modelValue === key }"
          :style="{ background: cfg.value }"
          @click="emit('update:modelValue', key)"
        />
        <span class="color-label">{{ cfg.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card { background: #fff; margin: 12px 14px 0; border-radius: 16px; padding: 18px 16px; box-shadow: 0 2px 16px rgba(85,112,241,.08); }
.card-title { font-size: 16px; font-weight: 600; margin: 0 0 14px; }

.color-row  { display: flex; gap: 28px; padding: 4px 2px; }
.color-item { display: flex; flex-direction: column; align-items: center; gap: 7px; }
.color-dot {
  width: 54px; height: 54px;
  border-radius: 50%;
  border: 3px solid #e0e0e8;
  cursor: pointer;
  transition: border-color .15s, box-shadow .15s;
  outline: none;
  -webkit-appearance: none;
}
.color-dot.active {
  border-color: #6e8ef5;
  box-shadow: 0 0 0 3px rgba(110,142,245,.28);
}
.color-label { font-size: 12px; color: #777; }
</style>
