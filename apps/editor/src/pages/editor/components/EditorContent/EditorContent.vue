<script setup lang="ts">
import { useProjectStore } from '@/store';
import './EditorContent.less';
import { materialMap } from '@/data';
import VueDragResize from 'vue-drag-resize-next';
import 'vue-drag-resize-next/lib/style.css';

const projectStore = useProjectStore();

function onDragEnd(ev: any) {
  const { x, y, ...reset } = ev;

  const left = Math.min(Math.max(x, 0), 630 - reset.width);
  projectStore.changeElementStyle({
    left,
    top: y,
    ...reset,
  });
}
</script>

<template>
  <div class="editor-content">
    <div
      v-for="item in projectStore.currentPageElements"
      :key="item.id"
    >
      <VueDragResize
        :active="projectStore.currentElement?.id === item.id"
        :x="item.style.left || 0"
        :y="item.style.top || 0"
        :width="item.style.width"
        :height="item.style.height"
        :rotatable="false"
        :immediate="true"
        @click="projectStore.setCurrentElement(item.id)"
        @dragging="onDragEnd"
        @resizing="onDragEnd"
      >
        <component
          :is="materialMap[item.mId].name"
          v-if="projectStore.isLoaded(item.mId)"
          v-bind="item.props"
        />
        <div v-else>
          loading
        </div>
      </VueDragResize>
    </div>
  </div>
</template>
