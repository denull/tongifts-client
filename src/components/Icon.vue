<script setup>
import icons from '../icons.js';
defineProps({
  name: {
    type: String,
    required: true
  },
});
</script>

<template>
  <div v-html="icons[name]"></div>
</template>

<style scoped>

</style>