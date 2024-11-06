<script setup>
import { loc } from '../locales.js';
defineProps({
  gift: Object,
  variant: String,
});
defineEmits(['action']);
</script>

<template>
  <section>
    <h1>{{ loc('actionsTitle') }}</h1>
    <h3>{{ loc('actionsSubtitle') }}</h3>
  </section>
</template>

<style scoped>
</style>