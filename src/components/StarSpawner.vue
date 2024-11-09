<script setup>
import { loc } from '@/locales.js';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Icon from './Icon.vue';
const props = defineProps({
  count: {
    type: Number,
    default: 50,
  }
});

const stars = ref([]);
const starsEl = ref(null);
function spawnStar() {
  const angle = Math.random() * Math.PI * 2;
  const d = Math.random() * 0.4 + 0.1;
  const ratio = w / h;

  return {
    x: Math.cos(angle) * 30, y: Math.sin(angle) * 30,
    vx: Math.cos(angle) * d * ratio, vy: Math.sin(angle) * d,
    age: 0,
    color: ['#FF9044', '#FECC13', '#FEBF05'][Math.floor(3 * Math.random())],
    base: Math.random() * 0.9 + 0.1,
    scale: 1,
  };
}
function tick() {
  for (let i = 0; i < stars.value.length; i++) {
    stars.value[i].x += stars.value[i].vx;
    stars.value[i].y += stars.value[i].vy;
    stars.value[i].vx *= 0.9999;
    stars.value[i].vy *= 0.9999;
    stars.value[i].age += 1;
    const t = Math.max(0, Math.min(1, stars.value[i].age / 300));
    stars.value[i].scale = (1 - Math.cos(2 * Math.PI * Math.pow(t, 0.3))) * 0.5;
    if (stars.value[i].age > 150 && stars.value[i].base * stars.value[i].scale < 0.4) {
      stars.value.splice(i, 1);
      i--;
      //stars.value[i] = spawnStar();
    }
  }
  if (stars.value.length < props.count && Math.random() < 0.3) {
    stars.value.push(spawnStar());
  }
  //stars.value = [...stars.value];
  if (!stopped) {
    requestAnimationFrame(tick);
  }
}
let w, h, stopped;
onMounted(() => {
  const bounds = starsEl.value.getBoundingClientRect();
  w = bounds.width;
  h = bounds.height;
  for (let i = 0; i < props.count / 3; i++) {
    stars.value.push(spawnStar());
  }
  tick();
});
onBeforeUnmount(() => {
  stopped = true;
});
</script>

<template>
  <div class="stars" :ref="el => starsEl = el">
    <Icon v-for="star in stars" class="star" name="star" :style="{ transform: `translate(${star.x}px, ${star.y}px) scale(${star.scale})`, color: star.color }" />
  </div>
</template>

<style scoped>
.stars {
  position: relative;
}
.star {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
}
</style>