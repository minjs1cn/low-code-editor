<script setup lang="ts">
import { getMaterialEditorProps, materialMap } from '@/data';
import { useProjectStore } from '@/store';
import { computed } from 'vue';
import './EditorRight.less';
const projectStore = useProjectStore();
const editorProps = computed(() => {
  if (projectStore.currentElement === undefined) {
    return undefined
  }
  return getMaterialEditorProps(materialMap[projectStore.currentElement.mId])
})
const elementProps = computed(() => {
  if (projectStore.currentElement === undefined) {
    return undefined
  }
  return projectStore.currentElement.props
})
const onPropsChange = (e: Event) => {
  console.log((e.target as HTMLInputElement).value)
  projectStore.changeElementProps({
    src: (e.target as HTMLInputElement).value
  })
}
</script>

<template>
  <div class="editor-right">
    <input v-if="editorProps !== undefined" type="text" :value="elementProps.src" @change="onPropsChange($event)">
  </div>
</template>