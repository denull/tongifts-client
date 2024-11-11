<script setup>
import { gifts } from '@/globals.js';
import { loc } from '../locales.js';
import ItemGift from './ItemGift.vue';
import ItemEmpty from './ItemEmpty.vue';
import { ref } from 'vue';
import { loadInventory } from '@/api.js';
import { makeScroller } from '@/utils.js';
const props = defineProps({
  items: {},
});

const list = ref(props.items);
const listScrolled = makeScroller(list, (offs) => loadInventory(offs));
</script>

<template>
  <section v-on:scroll="listScrolled">
    <h1>{{ loc('giftsTitle') }}</h1>
    <h3>{{ loc('giftsSubtitle') }}</h3>

    <div class="list">
      <ItemGift class="gift" v-for="item in list" :gift="gifts[item.giftId]" variant="inventory" @click="$emit('select', item)" @send="$emit('send', item)"/>
      <ItemEmpty v-if="!items.length" text="giftsEmpty" @action="$emit('store')"/>
    </div>
  </section>
</template>

<style scoped>
section {
  overflow-y: auto;
  overscroll-behavior-y: var(--overscroll);
}
.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  row-gap: 8px;
  padding: 8px 16px 16px;
}

</style>