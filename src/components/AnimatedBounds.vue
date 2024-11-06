<script setup>
import { ref, onMounted, computed } from 'vue';

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

    const style = elRef.value.style;
    const deltaX = props.from.left - finalBounds.left;
    const deltaY = props.from.top - finalBounds.top;
    const scaleX = props.from.width / finalBounds.width;
    const scaleY = props.from.height / finalBounds.height;
    //style.transition = props.transition;

    style.position = 'fixed';
    style.top = `${finalBounds.top}px`;
    style.left = `${finalBounds.left}px`;
    style.zIndex = 1000000;
    style.pointerEvents = 'none';
    style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;
    
    elRef.value.ontransitionend = () => {
      clone.replaceWith(elRef.value);

      style.position = 'static';
      style.zIndex = 'auto';
      style.pointerEvents = 'all';
      //elRef.value.style.visibility = 'visible';
    }
    document.body.append(elRef.value);
    requestAnimationFrame(() => {
      style.transition = props.transition;
      style.transform = 'none';
    });
  });
}
</script>

<template>
  <div :ref="el => elRef = el" class="animated"><slot></slot></div>
</template>