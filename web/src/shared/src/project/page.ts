import { IElement, PageElement } from './element';

export interface IPage {

  /** 名称 */
  name: string;

  /** 描述 */
  description: string;

  /** 元素 */
  elements: IElement[];
}


export class Page implements IPage {
  public static create(p?: IPage) {
    const page = new Page();
    if (p) {
      page.name = p.name;
      page.description = p.description;
      page._elements = p.elements.map(element => PageElement.create(element));
    }
    return page;
  }

  public name = 'New Page';

  public description = 'New Page Description';

  private _elements: PageElement[] = [];

  public get elements() {
    return this._elements.map(p => p.getJson());
  }

  public addElement(element: PageElement) {
    this._elements.push(element);
  }

  public getElementById(id: string) {
    return this._elements.find(e => e.id === id);
  }

  public getElementByMid(mid: number) {
    return this._elements.filter(item => item.mId === mid);
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
