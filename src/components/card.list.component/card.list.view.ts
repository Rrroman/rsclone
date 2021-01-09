import './card.list.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

export default class CardListView extends EventEmitter {
  cardListBottom: HTMLElement | null;

  constructor(
    public model: unknown,
    public elements: any,
    public listHeader: string
  ) {
    super();
    this.cardListBottom = null;
  }

  show() {
    this.createCardList();
  }

  createCardList() {
    const cardListHeader = this.createHeader();
    const cardListBody = create('div', {
      className: 'card-list__body',
    });

    const cardListBottom = this.createAddBottomBtn();

    const cardContent = create('div', {
      className: 'card-content',
      child: [cardListHeader, cardListBody, cardListBottom],
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

    const menuBtn = CardListView.renderCardListMenuBtn();
    const cardListHeader = create('div', {
      className: 'card-header',
      child: [headerText, menuBtn],
    });

    cardListHeader.append(menuBtn);
    return cardListHeader;
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

    const bottomSettingsBtn = this.createSettingsBottomBtn();

    const cardListBottom = create('div', {
      className: 'card-list__bottom',
      child: [addBtn, bottomSettingsBtn],
    });

    return cardListBottom;
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
