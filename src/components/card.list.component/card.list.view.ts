import styles from './card.list.module.css';

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
      className: styles['card-list__body'],
    });

    const cardListBottom = this.createAddBottomBtn();

    const cardContent = create('div', {
      className: styles['card-content'],
      child: [cardListHeader, cardListBody, cardListBottom],
    });

    const cardList = create('div', {
      className: styles['card-list'],
      child: cardContent,
    });

    this.elements.prepend(cardList);
  }

  createHeader() {
    const headerText = create('textarea', {
      className: styles['card-name'],
      child: this.listHeader,
      parent: null,
      dataAttr: [
        ['maxlength', '512'],
        ['spellcheck', 'false'],
      ],
    });

    const menuBtn = CardListView.renderCardListMenuBtn();
    const cardListHeader = create('div', {
      className: styles['card-header'],
      child: [headerText, menuBtn],
    });

    cardListHeader.append(menuBtn);
    return cardListHeader;
  }

  static renderCardListMenuBtn() {
    return create('div', {
      className: styles['card-list__menu-btn'],
      child: '...',
    });
  }

  createAddBottomBtn() {
    const addBtnIcon = create('span', {
      child: ' + ',
    });
    const addBtnTextField = create('span', {
      child: 'add one more card',
    });

    const addBtn = create('a', {
      className: styles['card-list__add-btn'],
      child: [addBtnIcon, addBtnTextField],
      parent: this.cardListBottom,
    });

    const bottomSettingsBtn = this.createSettingsBottomBtn();

    const cardListBottom = create('div', {
      className: styles['card-list__bottom'],
      child: [addBtn, bottomSettingsBtn],
    });

    return cardListBottom;
  }

  createSettingsBottomBtn() {
    const settingsBtn = create('div', {
      child: ' ■ ',
      parent: this.cardListBottom,
    });
    return settingsBtn;
  }
}
