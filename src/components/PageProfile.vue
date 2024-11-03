<script setup>
import { gifts, locale, theme } from '@/globals.js';
import { loc } from '@/locales.js';
import Toggle from './Toggle.vue';
import Icon from './Icon.vue';
import ItemGift from './ItemGift.vue';
import Userpic from './Userpic.vue';
import { loadReceived } from '@/api.js';
import { ref } from 'vue';
const props = defineProps({
  user: {
  },
  position: {},
  self: {
    type: Boolean,
  },
  received: {},
});
const receivedGifts = ref(props.received || []);
if (!props.received) {
  loadReceived(props.user._id).then(list => {
    receivedGifts.value = list;
  });
}
</script>

<template>
  <section>
    <Toggle v-if="self" class="toggle-theme" :states="[{ icon: 'day' }, { icon: 'night' }]" :index="theme == 'day' ? 0 : 1" @change="(idx) => theme = ['day', 'night'][idx]"/>
    <Toggle v-if="self" class="toggle-lang" :states="[{ label: 'EN' }, { label: 'RU' }]" :index="locale == 'en' ? 0 : 1" @change="(idx) => locale = ['en', 'ru'][idx]" />
    <Userpic class="photo" :user="user"/>
    <div class="place">#{{ position + 1 }}</div>
    <div class="name">{{ user?.firstName }}{{ user?.lastName ? ' ' + user?.lastName : '' }}</div>
    <div class="count">{{ loc('numGifts')(user?.gifts) }}</div>
    <div class="actions" v-if="self" @click="$emit('actions')"><Icon class="actions-icon" name="recent"/> {{ loc('recentActions') }} ›</div>
    <div class="gifts">
      <ItemGift v-for="item in receivedGifts" :gift="gifts[item.giftId]" :fromId="item.userId" variant="profile" @click="$emit('select', item)"/>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 8px 0;
  padding-bottom: 100px;
  position: relative;
  overflow-y: auto;
}
.toggle-theme {
  position: absolute;
  top: 6px;
  left: 16px;
}
.toggle-lang {
  position: absolute;
  top: 6px;
  right: 16px;
}
.photo {
  width: 100px;
  height: 100px;
}
.place {
  margin-top: -14px;
  font-size: 14px;
  font-weight: 500;
  padding: 0px 8px;
  line-height: 22px;
  background: var(--color-label-secondary);
  color: var(--color-white);
  border: 2px solid var(--color-background);
  border-radius: 22px;
}
.name {
  margin-top: 12px;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.43px;
}
.count {
  margin-top: 4px;
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.442px;
  color: var(--color-label-secondary);
}
.actions {
  margin-top: 24px;
  color: var(--color-primary);
  font-weight: 500;
  display: flex;
}
.actions-icon {
  width: 24px;
  height: 24px;
  margin-right: 4px;
  margin-top: 1px;
}
.gifts {
  padding: 24px 16px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 12px;
}
</style>