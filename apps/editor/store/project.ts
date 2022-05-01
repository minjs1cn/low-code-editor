import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IProject } from '@lowcode1024/shared';

export const useProjectStore = defineStore('project', () => {
	const projects = ref<IProject[]>([]);
	const currentProject = ref<IProject | null>(null);

	return {
		projects,
		currentProject,
	};
});
