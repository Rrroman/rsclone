import './card.list.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import CardView from '../card.component/card.view';

export default class CardListView extends EventEmitter {
  cardListBottom: HTMLElement | null;

  addCardBlock: HTMLElement | null;

  addBtn: HTMLElement | null;

  bottomSettingsBtn: HTMLElement | null;

  cardListBody: HTMLElement | null;

  constructor(
    public boardModel: any,
    public board: any,
    public listHeader?: string
  ) {
    super();
    this.cardListBottom = null;
    this.addCardBlock = null;
    this.addBtn = null;
    this.bottomSettingsBtn = null;
    this.cardListBody = null;
  }

  show() {
    return this.createCardList();
  }

  createCardList() {
    const cardListHeader = this.createListHeader();
    this.cardListBody = create('div', {
      className: 'card-list__body',
    });

    this.cardListBody.addEventListener('click', () =>
      this.emit('openCardPopup')
    );

    const cardListBottom = this.createAddBottomBtn();

    const cardContent = create('div', {
      className: 'card-content',
      child: [cardListHeader, this.cardListBody, cardListBottom],
      parent: null,
      dataAttr: [['draggable', 'true']],
    });

    const cardList = create('div', {
      className: 'card-list',
      child: cardContent,
    });

    this.board.prepend(cardList);
    return cardContent;
  }

  createListHeader() {
    const headerText = create('textarea', {
      className: 'card-name',
      child: this.boardModel.getNewListName(),
      parent: null,
      dataAttr: [
        ['maxlength', '512'],
        ['spellcheck', 'false'],
        ['draggable', 'false'],
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
      child: 'Add one more card',
    });

    this.addBtn = create('a', {
      className: 'card-list__add-btn',
      child: [addBtnIcon, addBtnTextField],
      parent: this.cardListBottom,
    });

    this.bottomSettingsBtn = this.createSettingsBottomBtn();
    this.addCardBlock = this.addNewCardBlock();

    this.addBtn.addEventListener('click', () => this.emit('addOneMoreCard'));

    const cardListBottom = create('div', {
      className: 'card-list__bottom',
      child: [this.addCardBlock, this.addBtn, this.bottomSettingsBtn],
    });

    return cardListBottom;
  }

  addNewCardBlock() {
    const textarea = create('textarea', {
      className: 'add-card-block__textarea',
      child: null,
      parent: null,
      dataAttr: [
        ['dir', 'auto'],
        ['placeholder', 'Enter card title...'],
      ],
    });

    textarea.addEventListener('input', (event) =>
      this.emit('typingInTextarea', event)
    );

    const controlsButtons = create('div', {
      className: 'add-card-block__buttons',
    });

    const controlsSettings = create('div', {
      className: 'add-card-block__menu',
      child: '...',
    });

    const addCardBtn = create('input', {
      className: 'add-card-block__add-card-btn',
      child: null,
      parent: controlsButtons,
      dataAttr: [
        ['type', 'submit'],
        ['value', 'Add Card'],
      ],
    });

    addCardBtn.addEventListener('click', () => this.emit('addCard'));

    const closeAddCardBlock = create('a', {
      className: 'add-card-block__close-btn close-input',
      child: '&times;',
      parent: controlsButtons,
      dataAttr: [['href', '#']],
    });

    closeAddCardBlock.addEventListener('click', () =>
      this.emit('closeAddCardBlock')
    );

    const controls = create('div', {
      className: 'add-card-block__controls',
      child: [controlsButtons, controlsSettings],
    });

    const addOneMoreCardBlock = create('div', {
      className: 'card-list__add-card-block hidden',
      child: [textarea, controls],
      parent: this.cardListBottom,
    });
    return addOneMoreCardBlock;
  }

  createSettingsBottomBtn() {
    const settingsBtn = create('div', {
      className: 'card-list__settings-btn',
      child: ' ■ ',
      parent: this.cardListBottom,
    });
    return settingsBtn;
  }

  dragStartElementChange() {
    if (this.boardModel.draggableList) {
      this.boardModel.draggableList.firstChild.classList.add('black-back');
    }
  }

  dragEndElementChange() {
    if (this.boardModel.draggableList) {
      this.boardModel.draggableList.firstChild.classList.remove('black-back');
    }
  }

  showAddCardBlock() {
    if (this.addCardBlock && this.addBtn && this.bottomSettingsBtn) {
      this.addCardBlock.classList.remove('hidden');
      this.addBtn.classList.add('hidden');
      this.bottomSettingsBtn.classList.add('hidden');
    }
  }

  closeAddCardBlock() {
    if (this.addCardBlock && this.addBtn && this.bottomSettingsBtn) {
      this.addCardBlock.classList.add('hidden');
      this.addBtn.classList.remove('hidden');
      this.bottomSettingsBtn.classList.remove('hidden');
    }
  }

  renderCard() {
    const card = new CardView(this.boardModel, this.cardListBody);

    card.show();
  }
}
