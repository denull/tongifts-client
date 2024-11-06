<script setup>
import { loadRecentActions } from '@/api.js';
import { loc } from '../locales.js';
import { ref } from 'vue';
import ItemAction from './ItemAction.vue';
import { historyEmpty } from '@/globals.js';
defineProps({
});
const actions = ref([]);
historyEmpty.value = false;

// load actions
loadRecentActions().then(result => {
  actions.value = result;
  historyEmpty.value = result.length == 0;
});
</script>

<template>
  <section>
    <h1>{{ loc('actionsTitle') }}</h1>
    <h3>{{ loc('actionsSubtitle') }}</h3>
    <div class="list">
      <ItemAction v-for="action in actions" :action="action" variant="recent" class="action" @user="user => $emit('user', user, null, null)"/>
    </div>
  </section>
</template>

<style scoped>
section {
  overflow-y: auto;
  overflow-x: hidden;
}
section > * {
  flex-shrink: 0;
}
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>