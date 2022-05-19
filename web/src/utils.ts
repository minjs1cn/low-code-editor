/* eslint-disable no-multi-assign */
import { IMaterial } from '@/shared/src/';

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
    loadCss(src.replace(/\/[a-z0-9-.]+\.js/, '/style.css'));
  });
}

export async function loadMaterial(m: IMaterial) {
  await delay(Math.random() * 1000);
  return loadScript(m.source);
}

export function loadMaterials(materials: IMaterial[]) {
  return Promise.all(materials.map(m => loadMaterial(m)));
}

export function Storage(name: string) {
  const key = `__${name}`;

  function get() {
    return JSON.parse(localStorage.getItem(key));
  }

  function set(value: Record<string, any>) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function remove() {
    localStorage.removeItem(key);
  }

  return {
    get,
    set,
    remove,
  };
}

export const projectStorage = Storage('project');
