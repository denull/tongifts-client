<script setup>
import { loc } from '@/locales.js';
import { ref } from 'vue';
import PageStore from './components/PageStore.vue';
import PageGift from './components/PageGift.vue';
import PageGifts from './components/PageGifts.vue';
import PageLeaderboard from './components/PageLeaderboard.vue';
import PageProfile from './components/PageProfile.vue';
import TabButton from './components/TabButton.vue';

const page = ref('store');
</script>

<template>
  <main>
    <PageStore v-if="page == 'store'"/>
    <PageGifts v-else-if="page == 'gifts'"/>
    <PageLeaderboard v-else-if="page == 'leaderboard'"/>
    <PageProfile v-else-if="page == 'profile'"/>
  </main>
  <footer>
    <TabButton name="store" :active="page == 'store'" @click="page = 'store'"></TabButton>
    <TabButton name="gifts" :active="page == 'gifts'" @click="page = 'gifts'"></TabButton>
    <TabButton name="leaderboard" :active="page == 'leaderboard'" @click="page = 'leaderboard'"></TabButton>
    <TabButton name="profile" :active="page == 'profile'" @click="page = 'profile'"></TabButton>
  </footer>
</template>

<style scoped>
main {
  flex: 1;
}
footer {
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  background-color: var(--color-bg-tabbar);
  padding-top: 8px;
  border-top: 0.33px solid var(--color-separator);
}
@media (min-width: 1024px) {

}
</style>
