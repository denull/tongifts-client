<script setup>
import { gifts } from '@/globals.js';
import { loc } from '../locales.js';
import ItemGift from './ItemGift.vue';
defineProps({
  items: {},
});
</script>

<template>
  <section>
    <h1>{{ loc('giftsTitle') }}</h1>
    <h3>{{ loc('giftsSubtitle') }}</h3>

    <div class="list">
      <ItemGift class="gift" v-for="item in items" :gift="gifts[item.giftId]" variant="inventory" @click="$emit('select', item)" @send="$emit('send', item)"/>
    </div>
  </section>
</template>

<style scoped>
section {
  overflow-y: auto;
}
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 8px;
  padding: 8px 16px 16px;
}

</style>