<script setup>
import { onBeforeUnmount } from 'vue';
import { loc } from '../locales.js';
const props = defineProps({
  invoiceId: Number,
});
const emit = defineEmits(['paid']);
const ws = new WebSocket('ws');
ws.onopen = () => {
  ws.send(JSON.stringify({ init: Telegram.WebApp.initData, invoiceId: props.invoiceId }));
}
ws.onmessage = (ev) => {
  const data = JSON.parse(ev.data);
  if (data.status == 'paid') {
    emit('paid', data.action);
  }
}
onBeforeUnmount(() => {
  ws.close();
});
</script>

<template>
  <h1>{{ loc('waitPayment') }}</h1>
  <h3>{{ loc('waitPaymentSubtitle') }}</h3>
</template>

<style scoped>
</style>