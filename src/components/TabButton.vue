<script setup>
import { loc } from '../locales.js';
import Icon from './Icon.vue';
defineProps({
  name: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true,
  }
});
</script>

<template>
  <div class="button" :class="{ 'is-active': active }">
    <div class="image"><Icon :name="name" /></div>
    <div class="label">{{ loc(name) }}</div>
  </div>
</template>

<style scoped>
.button {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
}
.image {
  color: var(--color-icons);
}
.label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-label-tabbar);
}
.button.is-active .label {
  color: var(--color-primary);
}
.button.is-active .image {
  color: var(--color-primary);
}
</style>