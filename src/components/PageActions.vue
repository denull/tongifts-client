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
function isDateDifferent(d0, d1) {
  d0 = new Date(d0);
  d1 = new Date(d1);
  return d0.getFullYear() != d1.getFullYear() || d0.getMonth() != d1.getMonth() || d0.getDate() != d1.getDate();
}
</script>

<template>
  <section>
    <h1>{{ loc('actionsTitle') }}</h1>
    <h3>{{ loc('actionsSubtitle') }}</h3>
    <div class="list">
      <template v-for="(action, index) in actions">
        <div class="date" v-if="index == 0 || isDateDifferent(actions[index - 1].date, action.date)">
          {{ loc('dayFormat')(new Date(action.date)) }}
        </div>
        <ItemAction :action="action" variant="recent" class="action" @user="user => $emit('user', user, null, null)"/>
      </template>
    </div>
    <ItemEmpty v-if="!actions.length" title="actionsEmptyTitle" text="actionsEmptySubtitle" :action="false" class="empty"/>
  </section>
</template>

<style scoped>
section {
  overflow-y: auto;
  overscroll-behavior-y: var(--overscroll);
  overflow-x: hidden;
  z-index: 2;
  padding-bottom: 0;
}
h3 {
  margin-bottom: 24px;
}
section > * {
  flex-shrink: 0;
}
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.date {
  font-size: 13px;
  padding: 24px 16px 12px;
  color: var(--color-label-date);
  text-transform: uppercase;
}
.date + .action:before {
  display: none;
}
.empty {
  flex: 1;
  justify-content: center;
  background: transparent;
  padding: 0 96px;
}
</style>