<script setup lang="ts">
import { useProjectStore } from '@/store';
import './EditorContent.less';
import { materialMap } from '@/data';
import VueDragResize from 'vue-drag-resize-next';
import 'vue-drag-resize-next/lib/style.css';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { IElement } from '@lowcode1024/shared';

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

function onPageAdd() {
  projectStore.addPage();
}

function onPageClick(index: number) {
  projectStore.setCurrentPageIndex(index);
}

function onElementClick(ele: IElement) {
  projectStore.setCurrentElement(ele.id);
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
    <div class="editor-body">
      <div class="editor-body-pages">
        <div
          v-for="(item, index) in projectStore.project.pages"
          :key="index"
          class="page"
          :class="{active: projectStore.currentPageIndex === index}"
          @click="onPageClick(index)"
        >
          {{ item.name }}
        </div>
        <div
          class="add"
          @click="onPageAdd"
        >
          添加页面
        </div>
      </div>
      <div class="editor-body-elements">
        <div
          v-for="item in projectStore.currentPage.elements"
          :key="item.id"
          class="element"
          :class="{active: item.id === projectStore.currentElementId}"
          @click="onElementClick(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div
        ref="pageRef"
        class="editor-body-page"
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
  </div>
</template>
