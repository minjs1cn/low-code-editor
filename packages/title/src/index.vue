<script setup lang="ts">
const props = defineProps<{
  title: string;
  color: string;
  size: number;
}>();
</script>

<template>
  <div
    class="lc-title"
    :style="{
      color: props.color,
      fontSize: props.size + 'px',
    }"
  >
    {{ props.title }}
  </div>
</template>
