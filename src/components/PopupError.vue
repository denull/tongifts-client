<script setup>
import { loc } from '../locales.js';
const props = defineProps({
  error: String,
});
</script>

<template>
  <h1>{{ loc('errorTitle') }}</h1>
  <h3>{{ loc('errorSubtitle')(loc('error' + error) || error) }}</h3>
</template>

<style scoped>
</style>