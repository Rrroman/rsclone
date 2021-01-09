import './card.list.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

export default class CardListView extends EventEmitter {
  cardListBottom: HTMLElement | null;

  constructor(
    public model: unknown,
    public elements: any,
    public listHeader: string | HTMLElement
  ) {
    super();
    this.cardListBottom = null;
  }

  show() {
    this.createCardList();
  }

  createCardList() {
    const cardListInner = create('div', {
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

    const bottomBtn = this.createAddBottomBtn();
    const bottomSettingsBtn = this.createSettingsBottomBtn();

    this.cardListBottom = create('div', {
      className: 'card-list__bottom',
      child: [bottomBtn, bottomSettingsBtn],
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
    return create('div', {
      className: 'card-list__menu-btn',
      child: '...',
    });
  }

  createAddBottomBtn() {
    const addBtnIcon = create('span', {
      className: 'add-btn__icon',
      child: ' + ',
    });
    const addBtnTextField = create('span', {
      className: 'add-btn__text-field',
      child: 'add one more card',
    });

    const addBtn = create('a', {
      className: 'card-list__add-btn',
      child: [addBtnIcon, addBtnTextField],
      parent: this.cardListBottom,
    });

    return addBtn;
  }

  createSettingsBottomBtn() {
    const settingsBtn = create('div', {
      className: 'card-list__settings-btn',
      child: ' ■ ',
      parent: this.cardListBottom,
    });
    return settingsBtn;
  }
}
