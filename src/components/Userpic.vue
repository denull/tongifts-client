<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  },
});
</script>

<template>
  <img v-if="user?.hasPhoto" class="userpic" :src="`user/${user?._id}/photo.jpg`"/>
  <div v-else class="userpic is-missing">{{ user?.firstName ? user?.firstName[0] : '' }}{{ user?.lastName ? user?.lastName[0] : '' }}</div>
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