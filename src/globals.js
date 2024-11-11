import { ref } from 'vue';
export const locale = ref('en');
export const theme = ref('day');
export const gifts = ref({});
export const historyEmpty = ref(false);

const animCache = {};
export const anim = function(id) {
  if (!(id in animCache)) {
    animCache[id] = ref(null);
    fetch(`assets/anim/${id}.json`).then(async result => animCache[id].value = await result.json());
  }
  return animCache[id];
}