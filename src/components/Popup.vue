<script setup>
import Icon from './Icon.vue';
const props = defineProps({
  height: Number,
});
</script>

<template>
  <div class="popup-wrapper">
    <div class="popup-overlay" @click="$emit('close')"></div>
    <div class="popup" :style="{ height: `${height}px` }">
      <button class="btn-close"><Icon class="btn-close-icon" name="close" @click="$emit('close')"/></button>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  background-color: var(--color-black);
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}
:global(html.is-night .popup-overlay) {
  opacity: 0.5;
}
.popup {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-popup-background);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  padding: 16px;
}
.btn-close {
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  cursor: pointer;
  background: var(--color-popup-close);
  color: var(--color-popup-close-fg);
  width: 30px;
  height: 30px;
  border-radius: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.btn-close-icon {
  width: 24px;
  height: 24px;
}
</style>