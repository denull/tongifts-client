<script setup>
import { Vue3Lottie } from 'vue3-lottie';
import { loc } from '@/locales.js';
import { locale } from '@/globals.js';
import Icon from './Icon.vue';
import Userpic from './Userpic.vue';

defineProps({
  gift: {
    type: Object,
    required: true,
  },
  fromId: {
    type: Number,
  },
  variant: {
    type: String,
  }
});
</script>

<template>
  <div class="gift" :class="{ ['is-' + variant]: true }">
    <div class="availability" v-if="['store', 'profile'].includes(variant)">{{ loc('countOf')({ n: gift.total - gift.sold, total: gift.total }) }}</div>
    <Userpic v-if="variant == 'profile'" class="sender" :user="{ id: fromId }"/>
    <div class="name" v-if="variant == 'inventory'">{{ gift.name[locale] }}</div>
    <Vue3Lottie class="image" :animationLink="`assets/anim/gift-${gift.image}.json`" :width="variant == 'store' ? 117 : 73" :height="variant == 'store' ? 117 : 73" :autoPlay="false"/>
    <div class="name" v-if="['store', 'profile'].includes(variant)">{{ gift.name[locale] }}</div>
    <button v-if="variant == 'inventory'" @click="$emit('send')">
      <div class="btn-label">{{ loc('btnSend') }}</div>
    </button>
    <button v-else-if="variant == 'store' && gift.sold < gift.total" @click="$emit('buy')">
      <Icon class="btn-icon" :name="'asset' + gift.asset"/>
      <div class="btn-label">{{ gift.price }} {{ gift.asset }}</div>
    </button>
    <button v-else-if="variant == 'store'" class="is-disabled">
      <div class="btn-label">{{ loc('btnSoldOut') }}</div>
    </button>
  </div>
</template>

<style scoped>
.gift {
  position: relative;
  padding: 8px 12px;
  cursor: pointer;
  text-align: center;
  align-items: center;
}
.availability {
  align-self: flex-end;
  color: var(--color-foreground);
  font-size: 13px;
  opacity: 0.5;
}
.sender {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 8px;
  left: 8px;
  border-radius: 8px;
}
.image {
  margin-top: 8px;
}
.name {
  margin-top: 4px;
  font-size: 17px;
  font-weight: 500;
}
button {
  margin-top: 12px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 16px 3px 12px;
  background: var(--color-primary);
  border: none;
  border-radius: 100px;
  color: var(--color-white);
  z-index: 1;
  cursor: pointer;
  width: fit-content;
  height: 30px;
}
button.is-disabled {
  cursor: default;
  padding-left: 16px;
  background: var(--color-label-secondary);
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