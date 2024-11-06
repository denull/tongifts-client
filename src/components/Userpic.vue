<script setup>
import { ref } from 'vue';

defineProps({
  user: {
    type: Object,
    required: true
  },
});
const elRef = ref(null);
defineExpose({ elRef });
</script>

<template>
  <img v-if="user?.hasPhoto" class="userpic" :src="`user/${user?._id}/photo.jpg`" :ref="el => elRef = el"/>
  <div v-else class="userpic is-missing" :ref="el => elRef = el">{{ user?.firstName ? user?.firstName[0] : '' }}{{ user?.lastName ? user?.lastName[0] : '' }}</div>
</template>

<style>
.userpic {
  border-radius: 100%;
  overflow: hidden;
  flex-shrink: 0;
}
.is-missing {
  background-color: var(--color-label-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 15px;

  color: var(--color-white);
}
</style>