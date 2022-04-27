import App from './index.vue';

export default {
	render: App,
	editorProps: {
		src: {
			type: 'string',
			defaultValue: '//cdn.lowcode.cn/def.png',
		},
	},
};
