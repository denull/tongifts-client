<script setup>
import { loc } from '../locales.js';
import Icon from './Icon.vue';
import { gifts, locale } from '@/globals.js';
import Userpic from './Userpic.vue';
import StarSpawner from './StarSpawner.vue';
import { Vue3Lottie } from 'vue3-lottie';
defineProps({
  gift: Object,
  sent: Boolean,
});
</script>

<template>
  <!--Icon class="stars" name="stars"/-->
  <StarSpawner class="stars"/>
  <Vue3Lottie :animationData="JSON.parse(gifts[gift.giftId].anim)" :width="150" :height="150" :loop="false"/>
  <!--img :src="`assets/gift/${gifts[gift.giftId].image}.png`" class="image"/-->
  <h1>{{ sent ? gifts[gift.giftId].name[locale] : loc('btnSendGift') }}</h1>
  <table>
    <tbody>
      <tr v-if="!sent"><td class="label">{{ loc('gift') }}</td><td>{{ gifts[gift.giftId].name[locale] }}</td></tr>
      <tr v-if="sent"><td class="label">{{ loc('sender') }}</td><td><div class="sender" @click="$emit('user', gift.sender, null, null)"><Userpic class="sender-pic" :user="gift.sender"/> {{ gift.sender?.firstName }}{{ gift.sender?.lastName ? ' ' + gift.sender?.lastName : '' }}</div></td></tr>
      <tr><td class="label">{{ loc('date') }}</td><td>{{ loc('dateFormat')(new Date(gift.date)) }}</td></tr>
      <tr><td class="label">{{ loc('price') }}</td><td>
        <div class="price"><Icon class="asset-icon" :name="'asset' + gifts[gift.giftId].asset + 'bg'"/> {{ gifts[gift.giftId].price }} {{ gifts[gift.giftId].asset }}</div>
      </td></tr>
      <tr><td class="label">{{ loc('availability') }}</td><td>{{ loc('countOf')({ n: gifts[gift.giftId].total - gifts[gift.giftId].sold, total: gifts[gift.giftId].total }) }}</td></tr>
    </tbody>
  </table>
</template>

<style scoped>
.stars {
  position: absolute;
  top: 20px;
  left: 0px;
  height: 150px;
  right: 0px;
  margin: auto;
}
h1 {
  margin-top: 12px;
  margin-bottom: 24px;
}
.sender {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-primary);
  cursor: pointer;
}
.sender-pic {
  width: 16px;
  height: 16px;
  font-size: 9px;
}
.image {
  width: 150px;
  height: 150px;
}
table {
  width: 100%;
  border-spacing: 0;
}
table tr:first-child td:first-child {
  border-top-left-radius: 12px;
} 
table tr:first-child td:last-child {
  border-top-right-radius: 12px;
}
table tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
} 
table tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}
td.label {
  color: var(--color-label-secondary);
  width: 113px;
}
td {
  background-color: var(--color-background);
  border-right: 0.33px solid var(--color-separator);
  border-bottom: 0.33px solid var(--color-separator);
  padding: 8px 16px;
}
td:last-child {
  border-right: none;
}
tr:last-child td {
  border-bottom: none;
}
.price {
  display: flex;
  align-items: center;
  gap: 8px;
}
.asset-icon {
  width: 20px;
  height: 20px;
}
</style>