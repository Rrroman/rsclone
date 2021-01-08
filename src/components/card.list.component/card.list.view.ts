import './card.list.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

export default class CardListView extends EventEmitter {
  constructor(
    public model: unknown,
    public elements: any,
    public listHeader: string | HTMLElement
  ) {
    super();
  }

  show() {
    this.createCardList();
  }

  createCardList() {
    const cardListInner = create('ul', {
      className: 'card-list__inner',
      child: null,
    });

    const cardList = create('div', {
      className: 'card-list',
      child: cardListInner,
    });

    CardListView.createListHeader(cardListInner, this.listHeader);

    create('div', {
      className: 'card-list__body',
      parent: cardListInner,
    });

    this.elements.prepend(cardList);
  }

  static createListHeader(
    parentNode: HTMLElement,
    listHeader: HTMLElement | string
  ) {
    const cardListHeader = create('div', {
      className: 'card-list__header',
      child: listHeader,
      parent: parentNode,
    });

    const menuBtn = CardListView.renderCardListMenuBtn();
    cardListHeader.append(menuBtn);
  }

  static renderCardListMenuBtn() {
    return create('div', { className: 'card-list__menu-btn', child: '...' });
  }
}
