import { IMaterial } from '@lowcode1024/shared';

export const materialList: IMaterial[] = [
  {
    id: 1,
    type: 'component',
    category: {
      name: '基础组件',
    },
    version: '0.0.1',
    source: '/lc-image.0.0.1.umd.js',
    name: 'LcImage',
    title: '图片',
    thumbnail: '',
    data: [
      {
        version: '0.0.1',
        source: '/lc-image.0.0.1.umd.js',
      },
    ],
  },
];

export const materialMap: { [key: string]: IMaterial } = materialList.reduce(
  (pre, item) => {
    pre[item.id] = item;
    return pre;
  },
  {},
);

export function getMaterialEditorProps(material: IMaterial) {
  return window[material.name].editorProps;
}

export function getMaterialRenderFun(material: IMaterial) {
  return window[material.name].render;
}

export function getMaterialDefaultProps(material: IMaterial) {
  const props = getMaterialEditorProps(material);
  return Object.keys(props).reduce((pre, key) => {
    pre[key] = props[key].defaultValue;
    return pre;
  }, {});
}
