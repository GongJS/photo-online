<script setup lang="ts">
defineEmits<{ generate: [] }>()
</script>

<template>
  <div class="bottom-bar">
    <button class="generate-btn" @click="$emit('generate')">生成证件照</button>
  </div>
</template>

<style scoped>
.bottom-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  padding: 12px 14px; background: #fff;
  box-shadow: 0 -2px 20px rgba(85,112,241,.1); z-index: 100;
}
.generate-btn {
  display: block; width: 100%; max-width: 452px; margin: 0 auto;
  padding: 15px; border: none; border-radius: 14px;
  background: linear-gradient(135deg, #7b8ef5 0%, #5570f1 100%);
  color: #fff; font-size: 16px; font-weight: 600;
  cursor: pointer; font-family: inherit; letter-spacing: 2px;
  -webkit-tap-highlight-color: transparent;
}
.generate-btn:active { opacity: .88; }
</style>
