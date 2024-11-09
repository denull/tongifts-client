<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';

const props = defineProps({
  from: {
    type: Object,
  },
  transition: {
    type: String,
    default: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
  }
});

const elRef = ref(null);
//const style = ref({});

if (props.from) {
  onMounted(() => {
    const finalBounds = elRef.value.getBoundingClientRect();
    const clone = elRef.value.cloneNode(true);
    elRef.value.replaceWith(clone);
    clone.style.visibility = 'hidden';

    const finalX = finalBounds.left + finalBounds.width * 0.5;
    const finalY = finalBounds.top + finalBounds.height * 0.5;
    const initX = props.from.left + props.from.width * 0.5;
    const initY = props.from.top + props.from.height * 0.5;

    const style = elRef.value.style;
    const deltaX = initX - finalX;
    const deltaY = initY - finalY;
    const scale = Math.min(props.from.width / finalBounds.width, props.from.height / finalBounds.height);
    //style.transition = props.transition;

    style.position = 'fixed';
    style.display = 'flex';
    style.top = `${finalBounds.top}px`;
    style.left = `${finalBounds.left}px`;
    style.zIndex = 1000000;
    style.pointerEvents = 'none';
    style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale}, ${scale})`;
    
    let done = false;
    function finish() {
      done = true;
      clone.replaceWith(elRef.value);

      style.position = 'static';
      style.zIndex = 'auto';
      style.pointerEvents = 'all';
    }
    elRef.value.ontransitionend = finish;
    document.body.append(elRef.value);
    requestAnimationFrame(() => {
      style.transition = props.transition;
      style.transform = 'none';
    });
    onBeforeUnmount(() => {
      !done && finish();
    });
  });
}
</script>

<template>
  <div :ref="el => elRef = el" class="animated"><slot></slot></div>
</template>

<style scoped>
.animated {
  display: flex;
}
</style>