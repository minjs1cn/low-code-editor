import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { IProject, PageElement, Project } from '@lowcode1024/shared';

// 实例
const p = Project.create();
// 响应式对象

export const useProjectStore = defineStore('project', () => {
  const project = ref<IProject>(p.getJson());
  const currentPageIndex = ref(0);
  const currentPage = computed(() => project.value.pages[currentPageIndex.value]);
  const currentPageElements = computed(() => project.value.pages[currentPageIndex.value].elements);
  const currentElementIndex = ref(0);
  const currentElement = computed(() => currentPageElements.value[currentElementIndex.value]);

  function addElement(ele: PageElement) {
    p.getPageByIndex(currentPageIndex.value).addElement(ele);
    project.value = p.getJson();
  }

  function changeElementProps(props: Record<string, any>) {
    const element = p
      .getPageByIndex(currentPageIndex.value)
      .getElementById(currentElement.value.id);
    element.props = {
      ...element.props,
      ...props,
    };
    project.value = p.getJson();
  }

  return {
    project,
    currentPage,
    currentElement,
    currentPageElements,

    addElement,
    changeElementProps,
  };
});
