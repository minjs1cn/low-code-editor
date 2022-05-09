import App from './index.vue';
import './index.css';

export default {
	render: App,
	editorProps: {
		src: {
			type: 'string',
			defaultValue: '//cdn.lowcode.cn/def.png',
		},
	},
};
