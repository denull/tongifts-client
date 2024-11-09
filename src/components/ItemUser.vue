<script setup>
import { ref } from 'vue';
import { loc } from '../locales.js';
import Icon from './Icon.vue';
import Userpic from './Userpic.vue';
defineProps({
  user: {},
  self: {
    type: Boolean,
  },
  position: {
  }
});
const userpicEl = ref(null);
</script>

<template>
  <div class="user" @click="$emit('select', { userpicBounds: userpicEl.getBoundingClientRect() })">
    <Userpic class="userpic" :user="user" :ref="comp => userpicEl = comp?.elRef"/>
    <div class="body">
      <div class="name">{{ user?.firstName }}{{ user?.lastName ? ' ' + user?.lastName : '' }}<span v-if="self" class="you">{{ loc('you') }}</span></div>
      <div class="gifts"><Icon class="gifts-icon" name="gifts"/> {{ loc('numGiftsShort')(user?.gifts || 0) }}</div>
    </div>
    <div class="position" v-if="position !== null && !isNaN(position)">{{ position < 3 ? ['🥇','🥈','🥉'][position] : `#${position + 1}` }}</div>
  </div>
</template>

<style scoped>
.user {
  height: 56px;
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 0px 16px;
  position: relative;
}
.user:not(:first-child)::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 68px;
  right: 16px;
  height: 0.33px;
  background-color: var(--color-separator);
}
.userpic {
  width: 40px;
  height: 40px;
  margin-right: 12px;
}
.body {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.name {
  font-size: 17px;
  font-weight: 500;
  display: flex;
}
.you {
  margin-left: 6px;
  padding: 0px 4px;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  height: 14px;
  margin-bottom: 5px;
  align-self: end;
  letter-spacing: -0.1px;
  color: #8E8E93;
  background: rgba(142, 142, 147, 0.2);
  border-radius: 4px;
}
.gifts {
  color: var(--color-primary);
  font-size: 13px;
  margin-top: -2px;
  display: flex;
  align-items: center;
}
.gifts-icon {
  width: 12px;
  height: 12px;
  margin-top: -7px;
  margin-right: 6px;
  display: inline-block;
}
.position {
  font-weight: 500;
  font-size: 15px;
  color: var(--color-label-secondary);
}
</style>