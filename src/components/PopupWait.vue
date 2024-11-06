<script setup>
import { onBeforeUnmount } from 'vue';
import { loc } from '../locales.js';
const props = defineProps({
  invoiceId: String,
});
const emit = defineEmits(['paid']);
const ws = new WebSocket(import.meta.env.DEV ? 'ws://localhost:3041' : 'ws');
ws.onopen = () => {
  ws.send(JSON.stringify({ init: Telegram.WebApp.initData, invoiceId: props.invoiceId }));
}
ws.onmessage = (data) => {
  data = JSON.parse(data);
  if (data.status == 'paid') {
    emit('paid');
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