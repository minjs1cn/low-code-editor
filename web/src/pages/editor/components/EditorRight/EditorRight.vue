<script setup lang="ts">
import { getMaterialEditorProps, materialMap } from '@/data';
import { useProjectStore, useEventStore } from '@/store';
import { computed } from 'vue';
import './EditorRight.less';
const projectStore = useProjectStore();
const eventStore = useEventStore();

const editorProps = computed(() => {
  if (!projectStore.currentElement) {
    return {};
  }
  return getMaterialEditorProps(materialMap[projectStore.currentElement.mId]);
});
function onPropsChange(e: Event, key: string) {
  const target = e.target as HTMLInputElement;
  projectStore.changeElementProps({
    [key]: target.value,
  });
}

function onPageNameChange(e: Event) {
  const target = e.target as HTMLInputElement;
  projectStore.changePageName(target.value);
}

function onEventSave() {
  eventStore.saveEvent(projectStore.currentPageIndex, projectStore.currentElementId);
}

function onEventArgsChange(e: Event, index: number) {
  const ev = e.target as HTMLInputElement;
  eventStore.saveArgs(ev.value, index);
}
</script>

<template>
  <div class="editor-right">
    <div v-if="projectStore.currentElement === undefined">
      <input
        :value="projectStore.currentPage.name"
        @input="onPageNameChange($event)"
      >
    </div>
    <div v-else-if="!projectStore.isLoaded(projectStore.currentElement.mId)">
      loading
    </div>
    <div v-else>
      <div
        v-for="key in Object.keys(editorProps)"
        :key="key"
      >
        <input
          v-if="editorProps[key].type === 'string'"
          :value="editorProps[key].defaultValue"
          @input="onPropsChange($event, key)"
        >
        <input
          v-if="editorProps[key].type === 'number'"
          type="number"
          :value="editorProps[key].defaultValue"
          @input="onPropsChange($event, key)"
        >
        <input
          v-if="editorProps[key].type === 'color'"
          :value="editorProps[key].defaultValue"
          @input="onPropsChange($event, key)"
        >
        <div>
          <select
            :value="eventStore.currentType"
            @change="e => eventStore.onTypeChange((e.target as any).value)"
          >
            <option
              v-for="item in eventStore.editorEvents"
              :key="item.type"
            >
              {{ item.type }}
            </option>
          </select>
          <select>
            <option
              v-for="item in eventStore.currentEvents"
              :key="item.name"
            >
              {{ item.name }}
            </option>
          </select>
          <div v-if="eventStore.currentEventArgs">
            <div
              v-for="(item, index) in eventStore.currentEventArgs"
              :key="index"
            >
              <input
                v-if="item.type === 'string'"
                @input="onEventArgsChange($event, index)"
              >
            </div>
          </div>
          <button @click="onEventSave">
            save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
