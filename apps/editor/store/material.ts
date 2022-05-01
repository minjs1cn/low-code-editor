import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IMaterial } from '@lowcode1024/shared';

export const useMaterialStore = defineStore('material', () => {
	const materials = ref<IMaterial[]>([]);

	return {
		materials,
	};
});
