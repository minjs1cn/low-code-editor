import { TinyEmitter } from 'tiny-emitter';
import { reactive } from 'vue';

const globalEmitter = new TinyEmitter();
const win = window as any;
win.globalEmitter = globalEmitter;

globalEmitter.on('common:link', args => {
  console.log(args);
});

const editorEvents = reactive([
  {
    type: 'common',
    events: [
      {
        name: 'link',
        args: [
          {
            type: 'string',
          },
        ],
      },
    ],
  },
  {
    type: 'component',
    events: [],
  },
]);

export {
  editorEvents,
  globalEmitter,
};
