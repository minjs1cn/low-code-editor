<script setup lang="ts">
import { defineProps } from 'vue';

const { src } = defineProps<{
  src: string;
}>()
</script>

<template>
  <img :src="src" class="lc-image" />
</template>