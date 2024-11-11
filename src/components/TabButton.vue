<script setup>
import { Vue3Lottie } from 'vue3-lottie';
import { loc } from '../locales.js';
import Icon from './Icon.vue';
import { anim } from '@/globals.js';
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
    <div class="image">
      <Vue3Lottie v-if="active" :animationData="anim('tab-' + name).value" :width="26" :height="26" class="anim" :loop="false"/>
      <Icon v-else :name="name" class="icon"/>
    </div>
    <div class="label">{{ loc(name) }}</div>
  </div>
</template>

<style scoped>
.button {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 4px 4px;
  flex: 1;
}
.image {
  width: 26px;
  height: 26px;
  color: var(--color-icons);
  position: relative;
  filter: saturate(0);
  transition: filter 0.6s;
}
.anim {
  position: absolute;
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
  filter: none;
}
</style>