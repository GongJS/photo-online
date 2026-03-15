<script setup lang="ts">
import type { StatusState } from '@/types'
defineProps<{ state: StatusState; message: string }>()
</script>

<template>
  <div class="status-card">
    <div class="status-dot" :class="state" />
    <span class="status-text">{{ message }}</span>
  </div>
</template>

<style scoped>
.status-card {
  display: flex; align-items: center; gap: 10px;
  background: #fff; margin: 12px 14px 0;
  border-radius: 16px; padding: 14px 16px;
  box-shadow: 0 2px 16px rgba(85,112,241,.08);
}
.status-dot {
  width: 9px; height: 9px; border-radius: 50%;
  background: #6e8ef5; flex-shrink: 0;
  animation: blink 1.3s ease-in-out infinite;
}
.status-dot.done  { background: #22c55e; animation: none; }
.status-dot.error { background: #ef4444; animation: none; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }
.status-text { font-size: 13px; color: #555; }
</style>
