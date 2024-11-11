<script setup>
import { Vue3Lottie } from 'vue3-lottie';
import { loc } from '../locales.js';
import { anim, gifts, locale } from '@/globals.js';
import { onMounted, ref } from 'vue';
const props = defineProps({
  gift: Object,
  variant: String,
});
defineEmits(['action']);
const notificationEl = ref(null);
onMounted(() => {
  requestAnimationFrame(() => {
    notificationEl.value.classList.add('is-visible');
  });
  Telegram.WebApp.HapticFeedback.notificationOccurred('success');
});
</script>

<template>
  <section>
    <div class="content">
      <div class="image">
        <Vue3Lottie :animationData="JSON.parse(gifts[gift.giftId].anim)" class="gift" :width="100" :height="100" :loop="false"/>
        <Vue3Lottie :animationData="anim('effect-gift-purchased').value" class="effect" :width="320" :height="320" :loop="false"/>
      </div>
      <h1>{{ loc(variant + 'Title') }}</h1>
      <h3>{{ loc(variant + 'Subtitle')(gifts[gift.giftId].name[locale], gift) }}</h3>
    </div>
    <div class="notification" :ref="el => notificationEl = el">
      <img :src="`assets/gift/${gifts[gift.giftId].image}.png`" class="thumb" />
      <div class="body">
        <div class="notification-title">{{ loc(variant + 'NotifyTitle') }}</div>
        <div class="notification-subtitle">{{ loc(variant + 'NotifySubtitle')(gifts[gift.giftId].name[locale], gift) }}</div>
      </div>
      <div class="action" @click="$emit('action')">
        {{ loc(variant + 'Action') }}
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 32px;

  z-index: 2;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.image {
  position: relative;
  width: 100px;
}
.effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.notification {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  min-height: 53px;
  color: var(--color-white);
  background-color: var(--color-bg-notification);
  border-radius: 14px;
  display: flex;
  padding: 0 14px;
  align-items: center;
  transition: transform 0.5s;
  transform: translateY(100px);
}
.notification.is-visible {
  transform: none;
}
.thumb {
  width: 36px;
  height: 36px;
  margin-left: -5px;
  margin-right: 9px;
}
.body {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
  line-height: 15px;
  padding: 5px 0;
}
.notification-title {
  font-weight: 500;
}
.notification-subtitle {
  margin-top: 4px;
}
.action {
  font-size: 17px;
  color: var(--color-accent-cyan);
  cursor: pointer;
}
</style>