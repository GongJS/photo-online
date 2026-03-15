<script setup lang="ts">
const emit = defineEmits<{ file: [f: File] }>()

function handleChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) emit('file', file)
  // Reset so the same file can be re-selected
  ;(e.target as HTMLInputElement).value = ''
}
</script>

<template>
  <section class="card">
    <h2 class="card-title">上传照片</h2>
    <p class="card-hint">请上传或拍摄纯色背景的证件照</p>
    <div class="upload-row">
      <label class="upload-btn">
        <input type="file" accept="image/*" @change="handleChange" />
        <span class="upload-icon">🖼️</span>
        <span>从相册选择</span>
      </label>
      <label class="upload-btn">
        <input type="file" accept="image/*" capture="user" @change="handleChange" />
        <span class="upload-icon">📷</span>
        <span class="text-primary">立即拍照</span>
      </label>
    </div>
  </section>
</template>

<style scoped>
.card { background: #fff; margin: 12px 14px 0; border-radius: 16px; padding: 18px 16px; box-shadow: 0 2px 16px rgba(85,112,241,.08); }
.card-title { font-size: 16px; font-weight: 600; margin: 0 0 14px; }
.card-hint  { font-size: 12px; color: #aaa; margin: -8px 0 14px; }

.upload-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.upload-btn {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px; padding: 22px 8px;
  border: 1.5px dashed #d4d4e0; border-radius: 12px;
  cursor: pointer; font-family: inherit; font-size: 13px;
  color: #555; background: #fafafa;
  transition: background .12s;
  -webkit-tap-highlight-color: transparent;
}
.upload-btn:active { background: #f0f0f8; }
.upload-btn input[type='file'] { display: none; }
.upload-icon  { font-size: 32px; line-height: 1; }
.text-primary { color: #5570f1; }
</style>
