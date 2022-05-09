/* eslint-disable no-multi-assign */
import { IMaterial } from '@lowcode1024/shared';

export function loadCss(src: string) {
  return new Promise((resolve, reject) => {
    const sc = document.createElement('link');
    function onLoad() {
      resolve(src);
      sc.onload = sc.onerror = null;
    }
    sc.rel = 'stylesheet';
    sc.onload = onLoad;
    sc.onerror = reject;
    sc.href = src;
    sc.crossOrigin = 'anonymous';
    document.head.append(sc);
  });
}

export function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    const sc = document.createElement('script');
    function onLoad() {
      resolve(src);
      sc.onload = sc.onerror = null;
    }
    sc.onload = onLoad;
    sc.onerror = reject;
    sc.src = src;
    sc.crossOrigin = 'anonymous';
    document.head.append(sc);
    loadCss(src.replace('.js', '.css'));
  });
}

export function loadMaterials(materials: IMaterial[]) {
  return Promise.all(materials.map(m => loadScript(m.source)));
}
