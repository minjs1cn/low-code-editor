import { IMaterial } from '../material';
import { uuid } from '../utils';

export interface IProject {
	/** 名称 */
	name: string;
	/** 描述 */
	description: string;
	/** 页面 */
	pages: IPage[];
}

export interface IPage {
	/** 名称 */
	name: string;
	/** 描述 */
	description: string;
	/** 元素 */
	elements: IElement[];
}

export interface IElement {
	id: string;
	/** 名称 */
	name: string;
	/** 物料ID */
	mId: number;
	/** 物料版本 */
	mVersion: string;
}

export class Project implements IProject {
	public static create(p?: IProject) {
		const project = new Project();
		if (p) {
			project.name = p.name;
			project.description = p.description;
			project.pages = p.pages.map((page) => Page.create(page));
		} else {
			project.addPage(Page.create());
		}
		return project;
	}
	public name: string = 'New Project';
	public description: string = 'New Project Description';
	public pages: Page[] = [];

	constructor() {}

	public addPage(page: Page) {
		this.pages.push(page);
	}

	public removePage(page: Page) {
		const index = this.pages.indexOf(page);
		if (index >= 0) {
			this.pages.splice(index, 1);
		}
	}

	public insertPage(index: number, page: Page) {
		this.pages.splice(index, 0, page);
	}

	public getJson() {
		return {
			name: this.name,
			description: this.description,
			pages: this.pages.map((page) => page.getJson()),
		};
	}
}

export class Page implements IPage {
	public static create(p?: IPage) {
		const page = new Page();
		if (p) {
			page.name = p.name;
			page.description = p.description;
			page.elements = p.elements.map((element) => PageElement.create(element));
		}
		return page;
	}

	public name: string = 'New Page';
	public description: string = 'New Page Description';
	public elements: PageElement[] = [];

	constructor() {}

	public addElement(element: PageElement) {
		this.elements.push(element);
	}

	public removeElement(element: PageElement) {
		const index = this.elements.indexOf(element);
		if (index >= 0) {
			this.elements.splice(index, 1);
		}
	}

	public insertElement(index: number, element: PageElement) {
		this.elements.splice(index, 0, element);
	}

	public getJson() {
		return {
			name: this.name,
			description: this.description,
			elements: this.elements.map((element) => element.getJson()),
		};
	}
}

export class PageElement implements IElement {
	public static create(e?: IElement) {
		const element = new PageElement();
		if (e) {
			element.id = e.id;
			element.name = e.name;
			element.mId = e.mId;
			element.mVersion = e.mVersion;
		}
		return element;
	}
	public id: string = uuid();
	public name: string = 'New Element';
	public mId: number;
	public mVersion: string;

	constructor() {}

	public getJson() {
		return {
			id: this.id,
			name: this.name,
			mId: this.mId,
			mVersion: this.mVersion,
		};
	}
}
