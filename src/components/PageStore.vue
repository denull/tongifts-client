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
      <ItemGift v-for="gift in gifts" :gift="gift" variant="store" class="gift" @select="opts => $emit('select', gift, opts)" @buy="$emit('buy', gift)"/>
    </div>
  </section>
</template>

<style scoped>
section {
  overflow-y: auto;
  overscroll-behavior-y: var(--overscroll);
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
  /*height: 246px;*/
  /*background: linear-gradient(180deg, rgba(254, 160, 65, 0.2) 0%, rgba(254, 159, 65, 0.1) 100%), var(--color-background);*/
}
</style>