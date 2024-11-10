<script setup>
import { ref } from 'vue';
import { loc } from '../locales.js';
import Icon from './Icon.vue';
defineProps({
  states: {
    type: Array,
  },
  index: {
    type: Number,
  },
});
const emit = defineEmits(['change']);
function onToggle(i) {
  emit('change', i);
  Telegram.WebApp.HapticFeedback.selectionChanged();
}
</script>

<template>
  <div class="toggle" @click="onToggle(1 - index)">
    <div v-for="(st, i) in states" class="state" :class="{ 'is-active': index == i }">
      <Icon v-if="st.icon" class="icon" :name="st.icon"/>{{ st.label || '' }}
    </div>
  </div>
</template>

<style scoped>
.toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  background: var(--color-bg-darker);
  border-radius: 99px;
  cursor: pointer;
}
.state {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 37px;
  height: 28px;
  border-radius: 99px;
  align-self: stretch;
  flex-grow: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: var(--color-label-secondary);
}
.icon {
  width: 16px;
  height: 16px;
}
.state.is-active {
  color: var(--color-foreground);
  background: var(--color-active-toggle);
  border: 0.5px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
  border-radius: 99px;
}
</style>