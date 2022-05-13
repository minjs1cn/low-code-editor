import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { IElement, IMaterial, IProject, PageElement, Project } from '@lowcode1024/shared';
import { getMaterialRenderFun, getMaterialDefaultProps } from '@/data';
import { loadMaterial } from '@/utils';
import app from '../app';

// 实例
const p = Project.create();
// 响应式对象

export const useProjectStore = defineStore('project', () => {
  const materials = ref<Record<string, IMaterial>>({});
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

  function isLoaded(mid: number) {
    return materials.value[mid];
  }

  function changeElementPropsByMid(mid: number, props: Record<string, any>) {
    const elements = p
      .getPageByIndex(currentPageIndex.value)
      .getElementByMid(mid);

    elements.forEach(element => {
      element.props = {
        ...element.props,
        ...props,
      };
    });

    project.value = p.getJson();
  }

  async function load(material: IMaterial) {
    if (isLoaded(material.id)) {
      return;
    }
    await loadMaterial(material);
    const renderFun = getMaterialRenderFun(material);
    app.component(material.name, renderFun);
    materials.value = {
      ...materials.value,
      [material.id]: material,
    };
    changeElementPropsByMid(material.id, getMaterialDefaultProps(material));
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

    load,
    isLoaded,
  };
});
