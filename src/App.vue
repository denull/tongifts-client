<script setup>
import { loc } from '@/locales.js';
import { onMounted, ref, watch } from 'vue';
import PageStore from './components/PageStore.vue';
import PageGift from './components/PageGift.vue';
import PageInventory from './components/PageInventory.vue';
import PageLeaderboard from './components/PageLeaderboard.vue';
import PageProfile from './components/PageProfile.vue';
import TabButton from './components/TabButton.vue';
import { init } from './api.js';
import PopupGift from './components/PopupGift.vue';
import PageActions from './components/PageActions.vue';
import PageSuccess from './components/PageSuccess.vue';
import { gifts, theme } from './globals.js';

const page = ref('store');
const store = ref(null);
const inventory = ref(null);
const leaderboard = ref(null);
const me = ref(null);
const received = ref(null);
const boughtGift = ref(null);
const stack = ref([]);

init().then(data => {
  gifts.value = Object.fromEntries(data.gifts.map(gift => [gift._id, gift]));
  store.value = data.gifts;
  inventory.value = data.inventory;
  leaderboard.value = data.leaderboard;
  me.value = data.me;
  received.value = data.received;
});
function selectPage(newPage) {
  stack.value = [];
  Telegram.WebApp.BackButton.isVisible = stack.value.length > 0;
  page.value = newPage;
}
function pushPage(page) {
  stack.value = [...stack.value, page];
  Telegram.WebApp.BackButton.show();
}
function popPage() {
  stack.value.pop();
  Telegram.WebApp.BackButton.isVisible = stack.value.length > 0;
}
Telegram.WebApp.BackButton.onClick(popPage);
function selectUser(user, position) {
  pushPage({ profile: Object.assign(user, { position }) });
}
function viewGift(gift) {
  pushPage({ storeGift: gift });
}
function viewBoughtGift(gift) {
  boughtGift.value = gift;
}
function viewSentGift(gift) {

}
function buyGift(gift) {

}
function sendGift(gift) {

}
function showActions() {
  pushPage({ actions: true });
}
watch(theme, (newTheme, oldTheme) => {
  oldTheme && document.documentElement.classList.remove(`is-${oldTheme}`);
  newTheme && document.documentElement.classList.add(`is-${newTheme}`);
}, { immediate: true });
</script>

<template>
  <main>
    <KeepAlive><PageStore v-if="page == 'store'" :gifts="store" @select="viewGift" @buy="buyGift"/></KeepAlive>
    <KeepAlive><PageInventory v-if="page == 'gifts'" :items="inventory" @select="viewBoughtGift" @send="sendGift"/></KeepAlive>
    <KeepAlive><PageLeaderboard v-if="page == 'leaderboard'" :users="leaderboard" :me="me" @select="selectUser"/></KeepAlive>
    <KeepAlive><PageProfile v-if="page == 'profile'" :user="me" :position="me.position" :self="true" :received="received" @actions="showActions" @select="viewSentGift"/></KeepAlive>

    <template v-for="item in stack">
      <PageGift v-if="item.storeGift" :gift="item.storeGift"/>
      <PageProfile v-else-if="item.profile" :user="item.profile" :position="item.profile.position"/>
    </template>
    
    <PopupGift v-if="boughtGift" :gift="boughtGift"/>
  </main>
  <footer>
    <TabButton name="store" :active="page == 'store'" @click="selectPage('store')"></TabButton>
    <TabButton name="gifts" :active="page == 'gifts'" @click="selectPage('gifts')"></TabButton>
    <TabButton name="leaderboard" :active="page == 'leaderboard'" @click="selectPage('leaderboard')"></TabButton>
    <TabButton name="profile" :active="page == 'profile'" @click="selectPage('profile')"></TabButton>
  </footer>

  <PageActions v-if="stack[stack.length - 1]?.actions" />
  <PageSuccess v-if="false" />
</template>

<style scoped>
main {
  flex: 1;
  height: 0;
}
footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  background-color: var(--color-tabbar);
  backdrop-filter: blur(50px);
  border-top: 0.33px solid var(--color-separator);
  z-index: 1;
}
@media (min-width: 1024px) {

}
</style>
