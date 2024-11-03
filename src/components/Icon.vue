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
  <div class="icon" v-html="icons[name]"></div>
</template>

<style>
.icon > svg {
  width: 100%;
  height: 100%;
}
</style>