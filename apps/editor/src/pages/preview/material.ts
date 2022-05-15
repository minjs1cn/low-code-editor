import { IProject } from '@lowcode1024/shared';
import { getMaterialRenderFun, materialMap } from '@/data';
import { onMounted, ref } from 'vue';
import { loadMaterial, projectStorage } from '@/utils';
import app from '@/app';

export function useMaterial() {
  const project: IProject = projectStorage.get();
  const materials = project.pages[0].elements.map(item => materialMap[item.mId]);
  const loading = ref(false);
  onMounted(() => {
    loading.value = true;
    Promise.all(materials.map(loadMaterial)).then(() => {
      loading.value = false;
      materials.forEach(m => {
        app.component(m.name, getMaterialRenderFun(m));
      });
    });
  });

  return {
    loading,
    pages: project.pages,
  };
}
