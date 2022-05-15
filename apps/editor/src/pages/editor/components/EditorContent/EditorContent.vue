<script setup lang="ts">
import { useProjectStore } from '@/store';
import './EditorContent.less';
import { materialMap } from '@/data';
import VueDragResize from 'vue-drag-resize-next';
import 'vue-drag-resize-next/lib/style.css';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const projectStore = useProjectStore();
const route = useRouter();
const pageRef = ref<HTMLElement>();
let pageWidth = 0;
let pageHeight = 0;

onMounted(() => {
  if (pageRef.value) {
    pageWidth = pageRef.value.offsetWidth;
    pageHeight = pageRef.value.offsetHeight;
  }
});

function onDragEnd(ev: any) {
  const { x, y, ...ret } = ev;

  const width = Math.min(pageWidth, ret.width);
  const height = Math.min(pageHeight, ret.height);
  const left = Math.min(Math.max(x, 0), pageWidth - width);
  const top = Math.min(Math.max(y, 0), pageHeight - height);
  projectStore.changeElementStyle({
    left,
    top,
    width,
    height,
  });
}

function onSave() {
  projectStore.saveProject();
}

function onPreview() {
  route.push('/preview');
}
</script>

<template>
  <div class="editor-content">
    <div class="editor-content-header">
      <button @click="onSave">
        保存
      </button>
      <button @click="onPreview">
        预览
      </button>
    </div>
    <div
      ref="pageRef"
      class="editor-content-page"
    >
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
  </div>
</template>
