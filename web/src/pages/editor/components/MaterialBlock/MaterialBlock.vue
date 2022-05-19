<script setup lang="ts">
import './MaterialBlock.less';

interface IMaterialBlock {
  title: string;
}
const props = defineProps<IMaterialBlock>();
</script>

<template>
  <div class="material-block">
    {{ props.title }}
  </div>
</template>
