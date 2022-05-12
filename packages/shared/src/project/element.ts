import { uuid } from '../utils';

export interface IElementStyle {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  zIndex?: number;
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

  public name = 'New Element';

  public mId: number;

  public mVersion: string;

  public style: IElementStyle = {};

  public props: Record<string, any> = {};

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
