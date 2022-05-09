<script setup lang="ts">
import { useProjectStore } from '@/store';
import './EditorContent.less';
import { materialMap } from '@/data';
import { watchEffect } from 'vue';

const projectStore = useProjectStore();
watchEffect(() => {
  console.log(projectStore.currentPageElements[0])
})
</script>

<template>
  <div class="editor-content">
    <div v-for="item in projectStore.currentPageElements" :key="item.id">
      <component :is="materialMap[item.mId].name" v-bind="item.props" />
    </div>
  </div>
</template>