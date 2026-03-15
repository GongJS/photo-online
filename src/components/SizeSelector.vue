<script setup lang="ts">
import { SIZES } from '@/types'
import type { SizeKey } from '@/types'

const props = defineProps<{ modelValue: SizeKey }>()
const emit  = defineEmits<{ 'update:modelValue': [v: SizeKey] }>()

const sizeList = Object.entries(SIZES) as [SizeKey, (typeof SIZES)[SizeKey]][]
</script>

<template>
  <section class="card">
    <h2 class="card-title">选择尺寸</h2>
    <div class="size-grid">
      <button
        v-for="[key, cfg] in sizeList"
        :key="key"
        class="size-btn"
        :class="{ active: modelValue === key, passport: key === 'passport' }"
        @click="emit('update:modelValue', key)"
      >
        <span class="size-name">{{ cfg.label }}</span>
        <span class="size-dim">{{ cfg.mm }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.card { background: #fff; margin: 12px 14px 0; border-radius: 16px; padding: 18px 16px; box-shadow: 0 2px 16px rgba(85,112,241,.08); }
.card-title { font-size: 16px; font-weight: 600; margin: 0 0 14px; }

.size-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.size-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 12px 4px;
  border: 1.5px solid #e8e8ee;
  border-radius: 12px;
  background: #f9f9fb;
  cursor: pointer;
  font-family: inherit;
  transition: border-color .15s, background .15s;
}
.size-btn.passport { grid-column: 1 / -1; }
.size-btn.active   { background: #eef0ff; border-color: #6e8ef5; }
.size-name { font-size: 15px; font-weight: 500; color: #333; }
.size-dim  { font-size: 11px; color: #bbb; }
.size-btn.active .size-name { color: #5570f1; }
.size-btn.active .size-dim  { color: #9aaef8; }
</style>
