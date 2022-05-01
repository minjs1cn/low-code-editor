const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
	env: {
		es6: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'plugin:eslint-plugin/recommended',
	],
	overrides: [
		{
			files: ['*.vue'],
			parser: 'vue-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
		},
	],
});
