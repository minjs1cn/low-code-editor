<script setup lang="ts">
import './EditorLeft.less';
import MaterialBlock from '../MaterialBlock/MaterialBlock.vue';
import { getMaterialDefaultProps, materialList } from '@/data';
import { IMaterial, PageElement } from '@/shared/src/';
import { useProjectStore } from '@/store';

const projectStore = useProjectStore();

function onClick(e: Event, m: IMaterial) {
  console.log('click', m);
  const ele = PageElement.create();
  ele.mId = m.id;
  ele.mVersion = m.version;
  ele.props = getMaterialDefaultProps(m);
  projectStore.addElement(ele);
  projectStore.load(m);
}

</script>

<template>
  <div class="editor-left">
    <div
      v-for="item in materialList"
      :key="item.id"
      class="material"
      @click="onClick($event, item)"
    >
      <MaterialBlock :title="item.title" />
    </div>
  </div>
</template>
