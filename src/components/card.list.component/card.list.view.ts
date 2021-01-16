import styles from './card.list.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import CardView from '../card.component/card.view';
import CardController from '../card.component/card.controller';
import ListMenu from '../listMenu.component/listMenu.view';
import ListMenuController from '../listMenu.component/listMenu.controller';

export default class CardListView extends EventEmitter {
  cardListBottom: HTMLElement | null;

  addCardBlock: HTMLElement | null;

  addBtn: HTMLElement | null;

  bottomSettingsBtn: HTMLElement | null;

  cardListBody: HTMLElement | null;

  cardList: HTMLElement | null;

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
    this.cardList = null;
  }

  show() {
    return this.createCardList();
  }

  createCardList() {
    const cardListHeader = this.createListHeader();
    this.cardListBody = create('div', {
      className: styles['card-list__body'],
    });

    const cardListBottom = this.createAddBottomBtn();

    const cardContent = create('div', {
      className: styles['card-content'],
      child: [cardListHeader, this.cardListBody, cardListBottom],
      parent: null,
      dataAttr: [
        ['draggable', 'true'],
        ['list', 'true'],
      ],
    });

    this.cardList = create('div', {
      className: styles['card-list'],
      child: cardContent,
      parent: null,
      dataAttr: [['listWrapper', 'true']],
    });

    this.board.insertBefore(this.cardList, this.board.lastChild);
    if (this.cardListBody) {
      this.cardList.addEventListener('dragover', (event: Event) => {
        this.emit('cardDragover', event);
      });
    }

    return cardContent;
  }

  createListHeader() {
    const headerText = create('textarea', {
      className: styles['card-name'],
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
      className: styles['card-header'],
      child: [headerText, menuBtn],
    });

    menuBtn.addEventListener('click', (event: Event) => {
      event.stopPropagation();

      this.emit('openmenu', event);
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
      child: 'Add one more card',
    });

    this.addBtn = create('a', {
      className: styles['card-list__add-btn'],
      child: [addBtnIcon, addBtnTextField],
      parent: this.cardListBottom,
    });

    this.bottomSettingsBtn = this.createSettingsBottomBtn();
    this.addCardBlock = this.addNewCardBlock();

    this.addBtn.addEventListener('click', () => this.emit('addOneMoreCard'));

    const cardListBottom = create('div', {
      className: styles['card-list__bottom'],
      child: [this.addCardBlock, this.addBtn, this.bottomSettingsBtn],
    });

    return cardListBottom;
  }

  addNewCardBlock() {
    const textarea = create('textarea', {
      className: styles['add-card-block__textarea'],
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
      className: styles['add-card-block__buttons'],
    });

    const controlsSettings = create('div', {
      className: styles['add-card-block__menu'],
      child: '...',
    });

    const addCardBtn = create('input', {
      className: styles['add-card-block__add-card-btn'],
      child: null,
      parent: controlsButtons,
      dataAttr: [
        ['type', 'submit'],
        ['value', 'Add Card'],
      ],
    });

    addCardBtn.addEventListener('click', () => this.emit('addCard'));

    const closeAddCardBlock = create('a', {
      className: `${styles['add-card-block__close-btn']} ${styles['close-input']}`,
      child: '&times;',
      parent: controlsButtons,
      dataAttr: [['href', '#']],
    });

    closeAddCardBlock.addEventListener('click', () =>
      this.emit('closeAddCardBlock')
    );

    const controls = create('div', {
      className: styles['add-card-block__controls'],
      child: [controlsButtons, controlsSettings],
    });

    const addOneMoreCardBlock = create('div', {
      className: `${styles['card-list__add-card-block']} ${styles.hidden}`,
      child: [textarea, controls],
      parent: this.cardListBottom,
    });
    return addOneMoreCardBlock;
  }

  createSettingsBottomBtn() {
    const settingsBtn = create('div', {
      child: ' ■ ',
      parent: this.cardListBottom,
    });
    return settingsBtn;
  }

  dragStartElementChange() {
    if (this.boardModel.draggableList) {
      this.boardModel.draggableList.firstChild.classList.add(
        styles['black-back']
      );
    }
  }

  dragEndElementChange() {
    if (this.boardModel.draggableList) {
      this.boardModel.draggableList.firstChild.classList.remove(
        styles['black-back']
      );
    }
  }

  showAddCardBlock() {
    if (this.addCardBlock && this.addBtn && this.bottomSettingsBtn) {
      this.addCardBlock.classList.remove(styles.hidden);
      this.addBtn.classList.add(styles.hidden);
      this.bottomSettingsBtn.classList.add(styles.hidden);
    }
  }

  closeAddCardBlock() {
    if (this.addCardBlock && this.addBtn && this.bottomSettingsBtn) {
      this.addCardBlock.classList.add(styles.hidden);
      this.addBtn.classList.remove(styles.hidden);
      this.bottomSettingsBtn.classList.remove(styles.hidden);
    }
  }

  renderCard() {
    const card = new CardView(this.boardModel, this.cardListBody);

    const newCard = card.show();

    // eslint-disable-next-line no-new
    new CardController(this.boardModel, card);
    newCard.addEventListener('dragstart', (event: Event) => {
      event.stopPropagation();
      card.emit('cardDragstart', event.target);
    });
    newCard.addEventListener('dragend', (event: Event) => {
      event.stopPropagation();
      card.emit('cardDragend');
    });
  }

  openListMenu(event: MouseEvent) {
    const currentList = (event.target as HTMLElement).closest(
      '[data-list-wrapper]'
    );
    // eslint-disable-next-line no-new
    const listMenu = new ListMenu(
      this.boardModel,
      this.board,
      currentList as HTMLElement
    );
    listMenu.show();

    // eslint-disable-next-line no-new
    new ListMenuController(this.boardModel, listMenu);
  }

  appendCardInEmptyList(event: MouseEvent) {
    if (
      this.cardListBody &&
      this.boardModel.getDraggableCard() &&
      this.cardListBody.childNodes.length === 0
    ) {
      this.cardListBody.append(this.boardModel.getDraggableCard());
    } else {
      this.dragOverAppendCard(event);
    }
  }

  dragOverAppendCard(event: MouseEvent) {
    if (this.cardListBody && this.boardModel.getDraggableCard()) {
      const closestCard:
        | {
            element: null | ChildNode;
          }
        | undefined = this.getDragAfterElement(event.clientY);
      if (closestCard) {
        this.cardListBody.insertBefore(
          this.boardModel.getDraggableCard(),
          closestCard.element
        );
      }
    }
  }

  getDragAfterElement(coordinateY: number) {
    if (!this.cardListBody) return;
    const cardArr = [...this.cardListBody.childNodes];

    const closestCard: {
      element: null | ChildNode;
    } = {
      element: null,
    };
    cardArr.reduce(
      (closest: { [key: string]: number }, child: ChildNode) => {
        const box = (child as Element).getBoundingClientRect();
        const offset = coordinateY - (box.top + box.height / 2);

        if (offset < 0 && offset > closest.offset) {
          closestCard.element = child;
          return { offset };
        }

        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY }
    );

    // eslint-disable-next-line consistent-return
    return closestCard;
  }
}
