<script setup lang="ts">
import BasicHeader from '../BasicHeader/BasicHeader.vue';
import './BasicLayout.less';
</script>

<template>
  <div class="basic-layout">
    <div class="basic-layout-header">
      <BasicHeader />
    </div>
    <div class="basic-layout-content">
      <slot />
    </div>
  </div>
</template>
