<script setup>
import { locale } from '@/globals.js';
import { loc } from '../locales.js';
import ItemGift from './ItemGift.vue';
import ItemAction from './ItemAction.vue';
import { ref } from 'vue';
import Icon from './Icon.vue';
import { loadGiftActions } from '@/api.js';
import ItemEmpty from './ItemEmpty.vue';
const props = defineProps({
  gift: Object,
  giftBounds: Object,
});
const actions = ref([]);

// load actions
loadGiftActions(props.gift._id).then(result => {
  actions.value = result;
});
</script>

<template>
  <section>
    <ItemGift :gift="gift" :giftBounds="giftBounds" variant="page" class="gift"/>
    <h1>{{ gift.name[locale] }} <div class="availability">{{ loc('countOf')({ n: gift.total - gift.sold, total: gift.total }) }}</div></h1>
    <h3>{{ loc('giftSubtitle') }}</h3>
    <div class="price"><Icon class="asset-icon" :name="'asset' + gift.asset + 'bg'"/> {{ gift.price }} {{ gift.asset }}</div>

    <div class="separator"></div>

    <div class="header">{{ loc('recentActions') }}</div>
    <div class="list">
      <ItemAction v-for="action in actions" :action="action" variant="gift" class="action" @user="user => $emit('user', user, null, null)"/>
      <ItemEmpty v-if="!actions.length" text="noRecentActions" :image="false" :action="false" class="empty" />
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 16px;
  align-items: start;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-y: var(--overscroll);
  z-index: 2;
}
section > * {
  flex-shrink: 0;
}
.gift {
  width: calc(100vw - 32px);
  height: calc(100vw - 32px);
}
.empty {
  background: none !important;
}
.availability {
  display: inline-block;
  padding: 0px 9px;
  background: rgba(0, 122, 255, 0.12);
  border-radius: 11px;
  color: var(--color-primary);
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.1px;
  margin-left: 12px;
  margin-top: 3px;
}
h1 {
  margin-top: 12px;
  display: flex;
  align-items: center;
}
h3 {
  text-align: left;
  max-width: 100%;
  margin-top: 8px;
  margin-bottom: 12px;
}
.price {
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 12px;
}
.asset-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.separator {
  width: calc(100% + 32px);
  margin-left: -16px;
  height: 12px;
  background: var(--color-bg-secondary);
}
.header {
  padding: 24px 0px 12px;
  text-transform: uppercase;
  font-size: 13px;
  color: var(--color-label-date);
}
.list {
  width: calc(100% + 32px);
  margin-left: -16px;
  display: flex;
  flex-direction: column;
}
</style>