<script setup>
import { ref, watch } from 'vue';
import { loc } from '../locales.js';
import ItemUser from './ItemUser.vue';
const props = defineProps({
  users: {},
  me: {}
});
const positions = ref({});
watch(() => props.users, users => { // Proper way to compute standing (because multiple people can be on the same place)
  let prev = null;
  const pos = {};
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    pos[user._id] = (prev && prev.gifts == user.gifts) ? pos[prev._id] : i;
    prev = user;
  }
  positions.value = pos;
}, { immediate: true });
</script>

<template>
  <section>
    <div class="search">

    </div>
    <div class="list">
      <ItemUser v-for="user in users" :user="user" :position="positions[user._id]" @select="opts => $emit('select', user, positions[user._id], opts)"/>
    </div>
    <div class="you">
      <ItemUser :user="me" :self="true" :position="me?.position" @select="opts => $emit('select', me, me.position, opts)"/>
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