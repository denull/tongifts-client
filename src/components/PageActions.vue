<script setup>
import { loadRecentActions } from '@/api.js';
import { loc } from '../locales.js';
import { ref } from 'vue';
import ItemAction from './ItemAction.vue';
import { historyEmpty } from '@/globals.js';
import ItemEmpty from './ItemEmpty.vue';
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
    <ItemEmpty v-if="!actions.length" title="actionsEmptyTitle" text="actionsEmptySubtitle" :action="false" class="empty"/>
  </section>
</template>

<style scoped>
section {
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 2;
  padding-bottom: 0;
}
section > * {
  flex-shrink: 0;
}
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.empty {
  flex: 1;
  justify-content: center;
  background: transparent;
  padding: 0 96px;
}
</style>