import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

export default class HeaderView extends EventEmitter {
  header: HTMLElement | null;

  constructor(public model: unknown, public elements: any) {
    super();
    this.header = null;
  }

  show() {
    this.createHeader();
  }

  createHeader() {
    const header = create('header', {
      className: 'header',
      child: null,
    });

    create('h1', {
      className: 'header__title',
      child: 'Trello',
      parent: header,
    });

    this.elements.prepend(header);
  }
}
