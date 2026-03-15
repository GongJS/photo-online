<script setup lang="ts">
defineProps<{ dataURL: string; imgStyle: Record<string, string> }>()
const emit = defineEmits<{ download: [] }>()
</script>

<template>
  <section class="card">
    <h2 class="card-title">生成结果</h2>
    <div class="result-wrap">
      <img class="result-image" :src="dataURL" :style="imgStyle" alt="证件照" />
    </div>
    <button class="download-btn" @click="emit('download')">⬇ 下载证件照</button>
  </section>
</template>

<style scoped>
.card { background: #fff; margin: 12px 14px 0; border-radius: 16px; padding: 18px 16px; box-shadow: 0 2px 16px rgba(85,112,241,.08); }
.card-title { font-size: 16px; font-weight: 600; margin: 0 0 14px; }

.result-wrap   { display: flex; justify-content: center; margin-bottom: 14px; }
.result-image  { border-radius: 8px; border: 1px solid #e0e0ea; object-fit: contain; max-width: 100%; }
.download-btn {
  display: block; width: 100%; padding: 13px; border: none; border-radius: 12px;
  background: #eef0ff; color: #5570f1;
  font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit;
  letter-spacing: .5px;
}
.download-btn:active { background: #e0e4ff; }
</style>
