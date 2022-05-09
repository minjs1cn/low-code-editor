import { uuid } from '../utils';

export interface IProject {
	id: number;
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

export interface IElementStyle {
	width?: number;
	height?: number;
}

export interface IElement {
	id: string;
	/** 名称 */
	name: string;
	/** 物料ID */
	mId: number;
	/** 物料版本 */
	mVersion: string;
	/** 元素样式 */
	style: IElementStyle;
	/** 元素的属性 */
	props: Record<string, any>;
}

export class Project implements IProject {
	public static create(p?: IProject) {
		const project = new Project();
		if (p) {
			project.id = p.id;
			project.name = p.name;
			project.description = p.description;
			project._pages = p.pages.map((page) => Page.create(page));
		} else {
			project.addPage(Page.create());
		}
		return project;
	}
	public id: number;
	public name: string = 'New Project';
	public description: string = 'New Project Description';
	private _pages: Page[] = [];
	public get pages() {
		return this._pages.map((p) => p.getJson());
	}

	constructor() {}

	public addPage(page: Page) {
		this._pages.push(page);
	}

	public getPageByIndex(index: number) {
		return this._pages[index];
	}

	public removePage(page: Page) {
		const index = this._pages.indexOf(page);
		if (index >= 0) {
			this._pages.splice(index, 1);
		}
	}

	public insertPage(index: number, page: Page) {
		this._pages.splice(index, 0, page);
	}

	public getJson(): IProject {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			pages: this.pages,
		};
	}
}

export class Page implements IPage {
	public static create(p?: IPage) {
		const page = new Page();
		if (p) {
			page.name = p.name;
			page.description = p.description;
			page._elements = p.elements.map((element) => PageElement.create(element));
		}
		return page;
	}

	public name: string = 'New Page';
	public description: string = 'New Page Description';
	private _elements: PageElement[] = [];
	public get elements() {
		return this._elements.map((p) => p.getJson());
	}

	constructor() {}

	public addElement(element: PageElement) {
		this._elements.push(element);
	}

	public getElementById(id: string) {
		return this._elements.find((e) => e.id === id);
	}

	public removeElement(element: PageElement) {
		const index = this._elements.indexOf(element);
		if (index >= 0) {
			this._elements.splice(index, 1);
		}
	}

	public insertElement(index: number, element: PageElement) {
		this._elements.splice(index, 0, element);
	}

	public getJson(): IPage {
		return {
			name: this.name,
			description: this.description,
			elements: this.elements,
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
			element.style = e.style;
			element.props = e.props;
		}
		return element;
	}
	public id: string = uuid();
	public name: string = 'New Element';
	public mId: number;
	public mVersion: string;
	public style: IElementStyle = {};
	public props: Record<string, any> = {};

	constructor() {}

	public getJson(): IElement {
		return {
			id: this.id,
			name: this.name,
			mId: this.mId,
			mVersion: this.mVersion,
			style: this.style,
			props: this.props,
		};
	}
}
