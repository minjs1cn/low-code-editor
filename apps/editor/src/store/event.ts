import { editorEvents } from '@/data/event';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { p } from './project';

export const useEventStore = defineStore('event', () => {
  const currentType = ref<string>(editorEvents[0].type);
  const currentEvents = computed(() => editorEvents.find(item => item.type === currentType.value).events);
  const currentEventType = ref<string>(currentEvents.value[0].name);
  const currentEventArgs = computed(() => currentEvents.value.find(item => item.name === currentEventType.value).args);
  function onTypeChange(type: string) {
    currentType.value = type;
  }
  const currentEventArgValues = ref<any[]>([]);

  function saveEvent(page: number, elementId: string) {
    const { props } = p.getPageByIndex(page).getElementById(elementId);
    if (!props.events) {
      props.events = {};
    }
    props.events[`${currentType.value}:${currentEventType.value}`] = [ ...currentEventArgValues.value ];
  }

  function saveArgs(v: any, index: number) {
    currentEventArgValues.value[index] = v;
  }

  return {
    currentType,
    currentEvents,
    currentEventType,
    currentEventArgs,
    onTypeChange,
    editorEvents,
    saveEvent,
    saveArgs,
  };
});
