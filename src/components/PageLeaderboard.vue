<script setup>
import { loc } from '../locales.js';
import ItemUser from './ItemUser.vue';
defineProps({
  users: {},
  me: {}
});
</script>

<template>
  <section>
    <div class="search">

    </div>
    <div class="list">
      <ItemUser v-for="(user, index) in users" :user="user" :position="index" @click="$emit('select', user, index)"/>
    </div>
    <div class="you">
      <ItemUser :user="me" :self="true" :position="me?.position" @click="$emit('select', me, me.position)"/>
    </div>
  </section>
</template>

<style scoped>
.list {
  width: 100%;
  flex: 1;
  height: 0;
  overflow-y: auto;
}
.you {
  width: 100%;
  border-top: 0.33px solid var(--color-separator);
}
</style>