<script setup>
import { gifts, locale, theme } from '@/globals.js';
import { loc } from '@/locales.js';
import Toggle from './Toggle.vue';
import Icon from './Icon.vue';
import ItemGift from './ItemGift.vue';
import Userpic from './Userpic.vue';
import { loadReceived, loadUser, updateSettings } from '@/api.js';
import { onMounted, ref } from 'vue';
import AnimatedBounds from './AnimatedBounds.vue';
import ItemEmpty from './ItemEmpty.vue';
const props = defineProps({
  user: {
  },
  position: {},
  self: {
    type: Boolean,
  },
  received: {},
  userpicBounds: Object,
});
const user = ref(props.user);
const position = ref(props.position);
const receivedGifts = ref(props.received || []);
if (!props.received) {
  loadReceived(props.user._id).then(list => {
    receivedGifts.value = list;
  });
}
if (isNaN(props.position)) {
  loadUser(props.user._id).then(value => {
    user.value = value;
    position.value = value.position;
  });
}
const elRef = ref(null);
function updateTheme(value) {
  theme.value = value;
  updateSettings({ theme: value });
}
function updateLocale(value) {
  locale.value = value;
  updateSettings({ locale: value });
}
const anim = ref(false);
onMounted(() => {
  if (props.userpicBounds) {
    elRef.value.style.opacity = 0;
    requestAnimationFrame(() => {
      elRef.value.style.transition = `opacity 0.25s ease-in-out`;
      elRef.value.style.opacity = 1;
    });
  }
  anim.value = true;
});
</script>

<template>
  <section :ref="el => elRef = el">
    <Toggle v-if="self" class="toggle-theme" :states="[{ icon: 'day' }, { icon: 'night' }]" :index="theme == 'day' ? 0 : 1" @change="(idx) => updateTheme(['day', 'night'][idx])"/>
    <Toggle v-if="self" class="toggle-lang" :states="[{ label: 'EN' }, { label: 'RU' }]" :index="locale == 'en' ? 0 : 1" @change="(idx) => updateLocale(['en', 'ru'][idx])" />
    <AnimatedBounds :from="userpicBounds">
      <Userpic class="photo" :user="user"/>
    </AnimatedBounds>
    <div v-if="!isNaN(position)" class="place" :class="{ ['is-number-' + (position + 1)]: true, anim }">#{{ position + 1 }}</div>
    <div class="name">{{ user?.firstName }}{{ user?.lastName ? ' ' + user?.lastName : '' }}<Icon v-if="user?.premium" class="icon-premium" name="premium"/></div>
    <div class="count">{{ loc('numGifts')(user?.gifts) }}</div>
    <div class="actions" v-if="self" @click="$emit('actions')"><Icon class="actions-icon" name="recent"/> {{ loc('recentActions') }} ›</div>
    <div class="gifts">
      <ItemGift v-for="item in receivedGifts" :gift="gifts[item.giftId]" :from="item.sender" variant="profile" @click="$emit('select', item)"/>
      <ItemEmpty v-if="!receivedGifts.length" :text="self ? 'profileEmpty' : 'profileEmptyOther'" :action="self" @action="$emit('store')"/>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 8px 0;
  padding-bottom: 100px;
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
  font-size: 32px;
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
  opacity: 0;
  transition: opacity 1s;
}
.place.anim {
  opacity: 1;
}
.place.is-number-1 {
  background: var(--color-accent-gold);
}
.place.is-number-2 {
  background: var(--color-accent-gold);
}
.place.is-number-3 {
  background: var(--color-accent-gold);
}
.name {
  margin-top: 12px;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.43px;
  display: flex;
  align-items: center;
}
.icon-premium {
  width: 24px;
  height: 24px;
  margin-left: 6px;
  color: var(--color-primary);
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
  cursor: pointer;
}
.actions-icon {
  width: 24px;
  height: 24px;
  margin-right: 4px;
  margin-top: 1px;
}
.gifts {
  padding: 24px 16px 16px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 8px;
  row-gap: 8px;
}
</style>