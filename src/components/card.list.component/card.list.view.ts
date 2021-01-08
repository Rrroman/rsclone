import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

export default class CardListView extends EventEmitter {
  header: HTMLElement | null;

  constructor(public model: unknown, public elements: any) {
    super();
    this.header = null;
  }

  show() {
    this.createCardList();
  }

  createCardList() {
    const cardList = create('ul', {
      className: 'card-list',
      child: null,
    });

    this.elements.prepend(cardList);
  }
}
