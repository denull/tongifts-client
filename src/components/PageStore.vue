<script setup>
import { loc } from '../locales.js';
import ItemGift from './ItemGift.vue';
</script>

<template>
  <section>
    <Icon name="gifts" />
    <h1>{{ loc('storeTitle') }}</h1>
    <h3>{{ loc('storeSubtitle') }}</h3>

    <div class="list">
      <ItemGift />
    </div>
  </section>
</template>

<style scoped>
</style>