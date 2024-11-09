<script setup>
import { Vue3Lottie } from 'vue3-lottie';
import { loc } from '@/locales.js';
import { locale } from '@/globals.js';
import Icon from './Icon.vue';
import Userpic from './Userpic.vue';
import AnimatedBounds from './AnimatedBounds.vue';
import { ref } from 'vue';

defineProps({
  gift: {
    type: Object,
    required: true,
  },
  from: Object,
  variant: String,
  giftBounds: Object,
});
const imageEl = ref(null);
</script>

<template>
  <div class="gift" :class="{ ['is-' + variant]: true }" :style="['store', 'page'].includes(variant) ? {
        'background': `linear-gradient(180deg, #${gift.color}33 0%, #${gift.color}1a 100%), var(--color-background)`
      } : {}" @click="$emit('select', { giftBounds: imageEl.getBoundingClientRect() })">
    <div class="availability" v-if="['store', 'profile'].includes(variant)">{{ loc('countOf')({ n: gift.total - gift.sold, total: gift.total }) }}</div>
    <Userpic v-if="variant == 'profile'" class="sender" :user="from"/>
    <div class="name" v-if="variant == 'inventory'">{{ gift.name[locale] }}</div>
    <AnimatedBounds class="image" :class="{ ['is-' + variant]: true }" :from="giftBounds">
      <Vue3Lottie v-if="['store', 'page'].includes(variant)" :animationData="JSON.parse(gift.anim)" :width="variant == 'store' ? 117 : 73" :height="variant == 'store' ? 117 : 73" :ref="el => imageEl = el?.$el" :loop="false"/>
      <img v-else :src="`assets/gift/${gift.image}.png`" :ref="el => imageEl = el"/>
    </AnimatedBounds>
    <div class="name" v-if="['store', 'profile'].includes(variant)">{{ gift.name[locale] }}</div>
    <button v-if="variant == 'inventory'" class="is-send" @click.stop="$emit('send')">
      <div class="btn-label">{{ loc('btnSend') }}</div>
    </button>
    <button v-else-if="variant == 'store' && gift.sold < gift.total" @click.stop="$emit('buy')" class="is-with-icon">
      <Icon class="btn-icon" :name="'asset' + gift.asset"/>
      <div class="btn-label">{{ gift.price }} {{ gift.asset }}</div>
    </button>
    <button v-else-if="variant == 'store'" class="is-disabled" @click.stop="() => {}">
      <div class="btn-label">{{ loc('btnSoldOut') }}</div>
    </button>
  </div>
</template>

<style scoped>
.gift {
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  cursor: pointer;
  text-align: center;
  align-items: center;
  background-color: var(--color-bg-secondary);
  border-radius: 12px;
  width: calc((100% - 16px) / 3);
}
.gift.is-store:before, .gift.is-page:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(./pattern.png);
  background-size: 271px 586px;
  background-position: center;
  opacity: 0.1;
}
.gift.is-page {
  cursor: default;
}
:global(html.is-night .gift.is-store:before, html.is-night .gift.is-page:before) {
  opacity: 0.2;
}
.gift.is-page {
  justify-content: center;
}
.availability {
  align-self: flex-end;
  text-align: right;
  color: var(--color-foreground);
  font-size: 13px;
  opacity: 0.5;
  position: relative;
  top: -2px;
  right: -1px;
}
.sender {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 9px;
  left: 9px;
  font-size: 9px;
}
.image {
  width: 73px;
  height: 73px;
  margin-top: auto;
  margin-bottom: auto;
  z-index: 1;
}
.image > * {
  width: 100%;
  height: 100%;
}
.image.is-store {
  width: 117px;
  height: 117px;
}
.image.is-page {
  width: 268px;
  height: 268px;
}
.name {
  margin-top: 4px;
  margin-bottom: 8px;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.3;
}
.gift.is-profile .name {
  font-size: 14px;
  margin-bottom: 4px;
}
.gift.is-inventory .name {
  font-size: 12px;
  font-weight: normal;
  color: var(--color-label-secondary);
}
button {
  margin-top: 12px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 16px;
  background: var(--color-primary);
  border: none;
  border-radius: 100px;
  color: var(--color-white);
  z-index: 1;
  cursor: pointer;
  width: fit-content;
  height: 30px;
}
button.is-with-icon {
  padding-left: 12px;
}
button.is-disabled {
  cursor: default;
  color: var(--color-label-secondary);
  background: rgba(0,0,0,0.1);
  backdrop-filter: blur(50px);
}
:global(html.is-night .gift button.is-disabled) {
  background: rgba(255,255,255,0.05);
}
button.is-send {
  width: 100%;
}
.btn-icon {
  width: 24px;
  height: 24px;
}
.btn-label {
  margin-top: -2px;
  font-size: 13px;
  font-weight: 500;
}
</style>