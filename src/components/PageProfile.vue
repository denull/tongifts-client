<script setup>
import { locale, theme } from '@/globals.js';
import { loc } from '@/locales.js';
import Toggle from './Toggle.vue';
defineProps({
  self: {
    type: Boolean,
  }
});
</script>

<template>
  <section>
    <Toggle v-if="self" class="toggle-theme" :icons="['day', 'night']" @change="(idx) => theme = ['day', 'night'][idx]"/>
    <Toggle v-if="self" class="toggle-lang" :labels="['EN', 'RU']" @change="(idx) => locale = ['en', 'ru'][idx]" />
    <img class="userpic"/>
    <div class="place">#</div>
    <div class="name"></div>
    <div class="count"></div>
    <div class="actions"></div>
    <div class="gifts"></div>
  </section>
</template>

<style scoped>
</style>