import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { IElement, IProject, PageElement, Project } from '@lowcode1024/shared';

// 实例
const p = Project.create();
// 响应式对象

export const useProjectStore = defineStore('project', () => {
  const project = ref<IProject>(p.getJson());
  const currentPageIndex = ref(0);
  const currentPage = computed(() => project.value.pages[currentPageIndex.value]);
  const currentPageElements = computed(() => project.value.pages[currentPageIndex.value].elements);
  const currentElementIndex = ref(0);
  const currentElementId = ref();
  const currentElement = computed(() => {
    if (currentElementId.value) {
      return p
        .getPageByIndex(currentPageIndex.value)
        .getElementById(currentElementId.value);
    }
    return currentPageElements[currentElementIndex.value];
  });

  function setCurrentElement(id: string) {
    currentElementId.value = id;
  }

  function addElement(ele: PageElement) {
    currentElementId.value = ele.id;
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

  function changeElementStyle(style: Record<string, any>) {
    const element = p
      .getPageByIndex(currentPageIndex.value)
      .getElementById(currentElement.value.id);
    element.style = {
      ...element.style,
      ...style,
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
    changeElementStyle,
    setCurrentElement,
  };
});
