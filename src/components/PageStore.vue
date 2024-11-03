<script setup>
import { loc } from '@/locales.js';
import Icon from './Icon.vue';
import ItemGift from './ItemGift.vue';
defineProps({
  gifts: {
    required: true,
  }
});
</script>

<template>
  <section>
    <Icon class="icon" name="gifts" />
    <h1>{{ loc('storeTitle') }}</h1>
    <h3>{{ loc('storeSubtitle') }}</h3>

    <div class="list">
      <ItemGift v-for="gift in gifts" :gift="gift" variant="store" class="gift" @click="$emit('select', gift)" @buy="$emit('buy', gift)"/>
    </div>
  </section>
</template>

<style scoped>
section {
  overflow-y: auto;
}
.icon {
  margin-top: 24px;
  color: var(--color-primary);
}
.list {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 12px;
}

.gift {
  width: calc(50% - 6px);
  height: 246px;
  border-radius: 12px;
  position: relative;
  background: linear-gradient(180deg, rgba(254, 160, 65, 0.2) 0%, rgba(254, 159, 65, 0.1) 100%), var(--color-background);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.gift:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(./assets/pattern.png);
  background-size: 271px 586px;
  background-position: center;
  opacity: 0.1;
}
:global(html.is-night .gift:before) {
  opacity: 0.2;
}
</style>