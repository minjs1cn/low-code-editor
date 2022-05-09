<script setup lang="ts">
import './MaterialBlock.less';
import { defineProps } from 'vue';

interface IMaterialBlock {
  title: string;
}
const { title } = defineProps<IMaterialBlock>()
</script>

<template>
  <div class="material-block">{{title}}</div>
</template>