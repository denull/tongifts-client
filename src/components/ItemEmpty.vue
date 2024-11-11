<script setup>
import { anim } from '@/globals.js';
import { loc } from '@/locales.js';
import { Vue3Lottie } from 'vue3-lottie';
defineProps({
  title: String,
  text: String,
  image: {
    type: Boolean,
    default: true,
  },
  action: {
    type: Boolean,
    default: true,
  }
});
</script>

<template>
  <div class="empty">
    <Vue3Lottie v-if="image" :animationData="anim('emoji-balloons').value" :width="100" :height="100" :loop="false" class="image"/>
    <h1 v-if="title">{{ loc(title) }}</h1>
    <div class="text">{{ loc(text) }}</div>
    <div v-if="action" class="action" @click="$emit('action')">{{ loc('btnOpenStore') }}</div>
  </div>
</template>

<style scoped>
.empty {
  width: 100%;
  background-color: var(--color-bg-secondary);
  padding: 32px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 17px;
}
h1 {
  margin-bottom: -8px;
  text-align: center;
}
.text {
  margin: 16px 0;
  text-align: center;
}
.text:last-child {
  margin-bottom: 0;
}
.action {
  cursor: pointer;
  color: var(--color-primary);
  text-align: center;
}
</style>