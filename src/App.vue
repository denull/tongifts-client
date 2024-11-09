<script setup>
import { loc } from '@/locales.js';
import { onMounted, ref, watch } from 'vue';
import PageStore from './components/PageStore.vue';
import PageGift from './components/PageGift.vue';
import PageInventory from './components/PageInventory.vue';
import PageLeaderboard from './components/PageLeaderboard.vue';
import PageProfile from './components/PageProfile.vue';
import TabButton from './components/TabButton.vue';
import { buyGift, init } from './api.js';
import Popup from './components/Popup.vue';
import PopupGift from './components/PopupGift.vue';
import PageActions from './components/PageActions.vue';
import PageSuccess from './components/PageSuccess.vue';
import { gifts, historyEmpty, locale, theme } from './globals.js';
import PopupWait from './components/PopupWait.vue';
import PopupError from './components/PopupError.vue';

const page = ref('store');
const store = ref(null);
const inventory = ref(null);
const leaderboard = ref(null);
const me = ref(null);
const received = ref(null);
const giftPopup = ref(null);
const waitPopup = ref(null);
const giftBought = ref(null);
const giftReceived = ref(null);
const stack = ref([]);
const error = ref(null);
const loaded = ref(false);

init().then(data => {
  gifts.value = Object.fromEntries(data.gifts.map(gift => [gift._id, gift]));
  store.value = data.gifts;
  inventory.value = data.inventory;
  leaderboard.value = data.leaderboard;
  me.value = data.me;
  received.value = data.received;
  theme.value = data.me.theme || (Telegram.WebApp.colorScheme == 'dark' ? 'night' : 'day');
  locale.value = data.me.locale;

  if (data.gift) {
    if (data.gift.error) {
      error.value = data.gift.error;
    } else {
      giftReceived.value = data.gift.receive;
    }
  }

  loaded.value = true;
});
function selectPage(newPage) {
  stack.value = [];
  page.value = newPage;
  giftBought.value = null;
  giftReceived.value = null;
  Telegram.WebApp.BackButton.isVisible = stack.value.length > 0;
  Telegram.WebApp.HapticFeedback.selectionChanged();
}
function pushPage(page) {
  giftPopup.value = null;
  giftBought.value = null;
  giftReceived.value = null;
  stack.value = [...stack.value, page];
  Telegram.WebApp.BackButton.show();
}
function popPage() {
  if (giftPopup.value) {
    giftPopup.value = null;
  } else
  if (waitPopup.value) {
    waitPopup.value = null;
  } else
  if (error.value) {
    error.value = null;
  } else {
    stack.value = stack.value.slice(0, stack.value.length - 1);
  }
  Telegram.WebApp.BackButton.isVisible = stack.value.length > 0;
}
window.pop = popPage;
Telegram.WebApp.BackButton.onClick(popPage);
function selectUser(user, position, opts) {
  //console.log('selecting', user, opts);
  pushPage({ profile: Object.assign(user, { position }), userpicBounds: opts?.userpicBounds });
}
function viewGift(gift, opts) {
  pushPage({ storeGift: gift, giftBounds: opts?.giftBounds });
}
function viewBoughtGift(gift) {
  giftPopup.value = { gift, bought: true };
}
function invoicePaid(gift) {
  inventory.value = [gift, ...inventory.value];
  giftBought.value = gift;
  giftPopup.value = null;
  waitPopup.value = null;
}
function viewSentGift(gift) {
  giftPopup.value = { gift, sent: true };
}
async function doBuyGift(gift) {
  const result = await buyGift(gift._id);
  Telegram.WebApp.openTelegramLink(result.url);
  waitPopup.value = { gift, invoiceId: result.id };
}
function sendGift(gift) {
  Telegram.WebApp.switchInlineQuery(gift.code, ['users']);
}
function showActions() {
  pushPage({ actions: true });
}
let mainAction, secondaryAction;
watch([loaded, theme, giftPopup, waitPopup, error], ([loaded, newTheme, giftPopup, waitPopup, error]) => {
  if (!loaded) {
    return;
  }
  document.documentElement.className = `is-${newTheme} is-${Telegram.WebApp.platform}`;

  const anyPopup = giftPopup || waitPopup || error;
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--color-background');
  const headerColor = anyPopup ? getComputedStyle(document.documentElement).getPropertyValue('--color-background-dim') : bgColor;
  Telegram.WebApp.setBackgroundColor(bgColor);
  Telegram.WebApp.setHeaderColor(headerColor);
  Telegram.WebApp.setBottomBarColor(bgColor);
});
watch([stack, giftPopup, giftBought, giftReceived, historyEmpty, theme], ([stack, popup, giftBought, giftReceived, historyEmpty, theme]) => {
  let mainButton = null;
  let secondaryButton = null;
  let actions = [];
  const style = getComputedStyle(document.documentElement);
  const bgColor = style.getPropertyValue('--color-background');
  const bgSecColor = style.getPropertyValue('--color-bg-secondary');
  if (stack[stack.length - 1]?.actions && historyEmpty) {
    mainButton = loc('btnOpenStore');
    actions = [() => selectPage('store')];
  } else
  if (stack[stack.length - 1]?.storeGift) {
    mainButton = loc('btnBuyGift');
    actions = [() => doBuyGift(stack[stack.length - 1]?.storeGift)];
  } else
  if (popup) {
    mainButton = popup.sent ? loc('btnClose') : loc('btnSendToContact');
    actions = [popup.sent ? () => giftPopup.value = null : () => sendGift(popup.gift)];
  } else
  if (giftBought) {
    mainButton = loc('btnSendGift');
    secondaryButton = loc('btnOpenStore');
    actions = [() => selectPage('gifts'), () => selectPage('store')];
  } else
  if (giftReceived) {
    mainButton = loc('btnOpenProfile');
    actions = [() => selectPage('profile')];
  }
  mainAction = actions[0];
  secondaryAction = actions[1];
  Telegram.WebApp.MainButton.setParams(mainButton ? { text: mainButton, is_visible: true } : { is_visible: false });
  Telegram.WebApp.SecondaryButton.setParams(secondaryButton ? { text: secondaryButton, position: 'bottom', is_visible: true } : { is_visible: false });
  Telegram.WebApp.setBottomBarColor(bgSecColor);
});
Telegram.WebApp.MainButton.onClick(() => mainAction && mainAction());
Telegram.WebApp.SecondaryButton.onClick(() => secondaryAction && secondaryAction());
Telegram.WebApp.disableVerticalSwipes();
Telegram.WebApp.expand();
</script>

<template>
  <main>
    <KeepAlive><PageStore v-if="page == 'store'" :class="{ 'is-bg': stack.length > 0 }" :gifts="store" @select="viewGift" @buy="doBuyGift"/></KeepAlive>
    <KeepAlive><PageInventory v-if="page == 'gifts'" :class="{ 'is-bg': stack.length > 0 }" :items="inventory" @select="viewBoughtGift" @send="sendGift" @store="selectPage('store')"/></KeepAlive>
    <KeepAlive><PageLeaderboard v-if="page == 'leaderboard'" :class="{ 'is-bg': stack.length > 0 }" :users="leaderboard" :me="me" @select="selectUser"/></KeepAlive>
    <KeepAlive><PageProfile v-if="page == 'profile'" :class="{ 'is-bg': stack.length > 0 }" :user="me" :position="me.position" :self="true" :received="received" @actions="showActions" @select="viewSentGift" @store="selectPage('store')"/></KeepAlive>

    <template v-for="(item, i) in stack">
      <PageProfile v-if="item.profile" :class="{ 'is-bg': i < stack.length - 1 }" :user="item.profile" :position="item.profile.position" :userpicBounds="item.userpicBounds" @select="viewSentGift"/>
    </template>
    
    <Transition name="popup" :duration="250">
      <Popup v-if="giftPopup" @close="giftPopup = null" :height="418">
        <PopupGift :gift="giftPopup.gift" :sent="!!giftPopup.sent" @user="selectUser"/>
      </Popup>
      <Popup v-else-if="waitPopup" @close="waitPopup = null" :height="200">
        <PopupWait :invoiceId="waitPopup.invoiceId" @paid="gift => invoicePaid(gift)"/>
      </Popup>
      <Popup v-else-if="error" @close="error = null" :height="200">
        <PopupError :error="error"/>
      </Popup>
    </Transition>
  </main>
  <div class="footer-backdrop"></div>
  <footer>
    <TabButton name="store" :active="page == 'store'" @click="selectPage('store')"></TabButton>
    <TabButton name="gifts" :active="page == 'gifts'" @click="selectPage('gifts')"></TabButton>
    <TabButton name="leaderboard" :active="page == 'leaderboard'" @click="selectPage('leaderboard')"></TabButton>
    <TabButton name="profile" :active="page == 'profile'" @click="selectPage('profile')"></TabButton>
  </footer>

  <PageGift v-if="stack[stack.length - 1]?.storeGift" :gift="stack[stack.length - 1]?.storeGift" :giftBounds="stack[stack.length - 1]?.giftBounds" @user="selectUser"/>
  <PageActions v-if="stack[stack.length - 1]?.actions" @user="selectUser" />
  <PageSuccess v-if="giftBought" :gift="giftBought" variant="purchased" @action="selectPage('gifts')"/>
  <PageSuccess v-if="giftReceived" :gift="giftReceived" variant="received" @action="selectPage('profile')" />
</template>

<style scoped>
main {
  flex: 1;
  height: 0;
}
.footer-backdrop {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--tabbar-height);
  backdrop-filter: blur(50px);
  z-index: 1;
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--tabbar-height);
  display: flex;
  justify-content: space-evenly;
  background-color: var(--color-tabbar);
  backdrop-filter: blur(50px);
  border-top: 0.33px solid var(--color-separator);
  z-index: 2;
}
.is-bg {
  transform: scale(0.94);
  filter: blur(2px);
  opacity: 0.3;
  transition: transform 0.3s, filter 0.3s, opacity 0.3s;
}
</style>
<style>
.popup-enter-active .popup,
.popup-leave-active .popup {
  transition: transform 0.25s ease-in-out;
}

.popup-enter-from .popup,
.popup-leave-to .popup {
  transform: translateY(418px);
}

.popup-enter-active .popup-overlay,
.popup-leave-active .popup-overlay {
  transition: opacity 0.25s ease-in-out;
}

.popup-enter-from .popup-overlay,
.popup-leave-to .popup-overlay {
  opacity: 0;
}
</style>