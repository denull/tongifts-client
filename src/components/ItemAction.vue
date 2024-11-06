<script setup>
import { gifts, locale } from '@/globals.js';
import { loc } from '../locales.js';
import Userpic from './Userpic.vue';
import Icon from './Icon.vue';
defineProps({
  action: Object,
  variant: String,
});
</script>

<template>
  <div class="action" :class="{ ['is-' + action.type]: true, ['is-' + variant]: true }">
    <div class="image">
      <Userpic v-if="variant == 'gift'" class="userpic" :user="action.user"/>
      <img v-else :src="`assets/gift/${gifts[action.giftId].image}.png`" class="gift-image"/>
      <Icon :name="action.type" class="icon"/>
    </div>
    <div class="body">
      <div class="type">{{ loc(`action_${action.type}`) }}</div>
      <div v-if="variant == 'gift'" class="info"><span class="user" @click="$emit('user', action.user)">{{ action.user?.firstName }}</span> {{ loc(`actionInfo_${action.type}`) }} <span v-if="action.type == 'send'" @click="$emit('user', action.receiver)">{{ action.receiver?.firstName }}</span></div>
      <div v-else class="gift">{{ gifts[action.giftId].name[locale] }}</div>
    </div>
    <template v-if="variant != 'gift'">
      <div v-if="action.type == 'buy'" class="right is-price">−{{ gifts[action.giftId].price }} {{ gifts[action.giftId].asset }}</div>
      <div v-else-if="action.type == 'send'" class="right is-receiver">{{ loc('to') }} <span @click="$emit('user', action.receiver)">{{ action.receiver?.firstName }}</span></div>
      <div v-else-if="action.type == 'receive'" class="right is-sender">{{ loc('from') }} <span @click="$emit('user', action.sender)">{{ action.sender?.firstName }}</span></div>
    </template>
  </div>
</template>

<style scoped>
.action {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  position: relative;
}
.action:not(:first-child)::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 68px;
  right: 16px;
  height: 0.33px;
  background-color: var(--color-separator);
}
.image, .userpic {
  width: 40px;
  height: 40px;
}
.image {
  margin-right: 12px;
  position: relative;
}
.action.is-recent .image {
  background: var(--color-bg-secondary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gift-image {
  width: 32px;
  height: 32px;
}
.icon {
  position: absolute;
  bottom: 1px;
  right: -2px;
  width: 20px;
  height: 20px;
  color: var(--color-background);
}
.body {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.type {
  font-size: 13px;
  line-height: 16px;
  color: var(--color-label-secondary);
}
.info, .gift, .right {
  font-weight: 500;
  font-size: 17px;
  line-height: 22px;
}
.info span, .right span {
  font-weight: 500;
  color: var(--color-primary);
  cursor: pointer;
}
</style>