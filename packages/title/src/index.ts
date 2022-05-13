import App from './index.vue';
import './index.css';

export default {
  render: App,
  editorProps: {
    title: {
      type: 'string',
      defaultValue: 'hello world',
    },
    color: {
      type: 'color',
      defaultValue: '#333',
    },
    size: {
      type: 'number',
      defaultValue: 16,
      min: 0,
      max: 50,
    },
  },
};
