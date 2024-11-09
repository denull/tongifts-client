<script setup>
import { ref, watch } from 'vue';
import { loc } from '../locales.js';
import ItemUser from './ItemUser.vue';
import { searchUsers } from '@/api.js';
import Icon from './Icon.vue';
import ItemEmpty from './ItemEmpty.vue';
const props = defineProps({
  users: {},
  me: {}
});
const list = ref(props.users);
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

const searchQuery = ref('');
const filtered = ref(false);
async function search() {
  let query = searchQuery.value.trim().toLocaleLowerCase();
  if (query.startsWith('@')) {
    query = query.substring(1);
  }
  if (query == '') {
    list.value = props.users;
    filtered.value = false;
    return;
  }
  filtered.value = true;
  list.value = props.users.filter(user => {
    return (user.firstName || '').toLocaleLowerCase().indexOf(query) > -1 ||
      (user.lastName || '').toLocaleLowerCase().indexOf(query) > -1 ||
      (user.username || '').toLocaleLowerCase().indexOf(query) > -1;
  }); // Filter locally first

  // Load from server
  list.value = await searchUsers(query);
}
</script>

<template>
  <section>
    <div class="search">
      <input type="search" v-model="searchQuery" @input="search" @keydown.esc="(ev) => { if (!searchQuery) ev.target.blur() }"/>
      <div class="search-placeholder" :class="{ 'is-focused': filtered }">
        <Icon name="search" class="icon-search"/> {{ filtered ? '' : loc('search') }}
      </div>
    </div>
    <div class="list">
      <ItemUser v-for="user in list" :user="user" :position="filtered ? NaN : positions[user._id]" @select="opts => $emit('select', user, filtered ? NaN : positions[user._id], opts)"/>
      <ItemEmpty v-if="!list.length" :image="false" :action="false" text="noUsersFound" class="empty"/>
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
  border-top: 0.33px solid var(--color-separator);
}
.search {
  margin: 10px 10px 8px;
  width: calc(100% - 20px);
  height: 36px;
  background-color: var(--color-bg-secondary);
  border-radius: 10px;
  display: flex;
  position: relative;
}
:global(html.is-night .search) {
  background-color: rgba(0,0,0,0.5);
}
.search > input {
  border: none;
  width: 100%;
  height: 36px;
  padding: 8px 12px 8px 32px;
  font-size: 17px;
  color: var(--color-foreground);
  background: transparent;
}
.search-placeholder {
  position: absolute;
  top: 0px;
  left: 50%;
  bottom: 0px;
  font-size: 17px;
  color: var(--color-label-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
  transform: translateX(-50%);
  transition: left 0.3s, transform 0.3s;
  pointer-events: none;
}
.search-placeholder.is-focused, .search > input:focus + .search-placeholder {
  left: 10px;
  transform: none;
}
.empty {
  background: none !important;
}
.icon-search {
  width: 16px;
  height: 20px;
}
input:focus {
  outline: none;
}
.you {
  width: 100%;
  border-top: 0.33px solid var(--color-separator);
}
</style>