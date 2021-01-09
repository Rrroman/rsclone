import './card.list.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

export default class CardListView extends EventEmitter {
  constructor(
    public model: unknown,
    public elements: any,
    public listHeader: string
  ) {
    super();
  }

  show() {
    this.createCardList();
  }

  createCardList() {
    const cardListHeader = this.createHeader();
    const cardContent = create('div', {
      className: 'card-content',
      child: cardListHeader,
    });

    const cardList = create('div', {
      className: 'card-list',
      child: cardContent,
    });

    this.elements.prepend(cardList);
  }

  createHeader() {
    const headerText = create('textarea', {
      className: 'card-name',
      child: this.listHeader,
      parent: null,
      dataAttr: [
        ['maxlength', '512'],
        ['spellcheck', 'false'],
      ],
    });

    const menuBtn = create('a', {
      className: 'card-list__menu-btn',
      child: '...',
    });

    const cardListHeader = create('div', {
      className: 'card-header',
      child: [headerText, menuBtn],
    });

    return cardListHeader;
  }
}
