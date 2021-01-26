import styles from './card.list.module.css';
import globalStyles from '../../globals.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import ListMenu from '../listMenu.component/listMenu.view';
import ListMenuController from '../listMenu.component/listMenu.controller';
import { renderTextArea } from '../user.kit.component/user.kit.components';
import renderNewCard from '../user.kit.component/user.kit.render.component';

export default class CardListView extends EventEmitter {
  cardListBottom: HTMLElement | null;

  addCardBlock: HTMLElement | null;

  addBtn: HTMLElement | null;

  bottomSettingsBtn: HTMLElement | null;

  cardListBody: HTMLElement | null;

  cardList: HTMLElement | null;

  textarea: HTMLElement | null;

  cardContent: HTMLElement | null;

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
    this.textarea = null;
    this.cardContent = null;
  }

  show(insertBeforeElement: null | HTMLElement) {
    this.createCardList();
    this.appendList(insertBeforeElement);
  }

  createCardList() {
    const cardListHeader = this.createListHeader();
    this.cardListBody = create('div', {
      className: styles['card-list__body'],
    });

    const cardListBottom = this.createAddBottomBtn();

    const currentListOrder: number = this.boardModel.userBoards![
      this.boardModel.currentBoardIndex
    ].lists[this.boardModel.currentListIndex].order;

    this.cardContent = create('div', {
      className: styles['card-content'],
      child: [cardListHeader, this.cardListBody, cardListBottom],
      parent: null,
      dataAttr: [
        ['draggable', 'true'],
        ['list', 'true'],
        ['order', currentListOrder],
        ['listName', this.boardModel.getNewListName()],
      ],
    });

    this.cardList = create('div', {
      className: styles['card-list'],
      child: this.cardContent,
      parent: null,
      dataAttr: [['listWrapper', 'true']],
    });

    this.cardContent.addEventListener('dragstart', (event: DragEvent) => {
      if (event.target && (event.target as HTMLElement).dataset.list)
        this.emit('dragstart', event.target);
    });

    this.cardContent.addEventListener('dragend', () => {
      this.emit('dragend');
    });
  }

  appendList(insertBeforeElement: null | HTMLElement) {
    this.board.insertBefore(
      this.cardList,
      insertBeforeElement || this.board.lastChild
    );
    if (this.cardListBody) {
      this.cardList?.addEventListener('dragover', (event: Event) => {
        this.emit('cardDragover', event);
      });
    }
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

    headerText.addEventListener('click', (selectEvent) =>
      this.emit('selectText', selectEvent)
    );

    headerText.addEventListener('input', (headerTextChangeEvent) =>
      this.emit('headerTextChange', headerTextChangeEvent)
    );

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
    this.textarea = renderTextArea('Enter card title...');

    this.textarea.addEventListener('input', (event: Event) =>
      this.emit('addCardName', event)
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
    addCardBtn.addEventListener('click', () => this.emit('clearTextarea'));

    const closeAddCardBlock = create('a', {
      className: `${styles['add-card-block__close-btn']} ${styles['close-input']}`,
      child: '&times;',
      parent: controlsButtons,
      dataAttr: [['href', '#']],
    });

    closeAddCardBlock.addEventListener('click', () =>
      this.emit('closeAddCardBlock')
    );

    closeAddCardBlock.addEventListener('click', () =>
      this.emit('clearTextarea')
    );

    const controls = create('div', {
      className: styles['add-card-block__controls'],
      child: [controlsButtons, controlsSettings],
    });

    const addOneMoreCardBlock = create('div', {
      className: `${styles['card-list__add-card-block']} ${globalStyles.hidden}`,
      child: [this.textarea, controls],
      parent: this.cardListBottom,
    });

    return addOneMoreCardBlock;
  }

  clearTextarea() {
    if (this.textarea) {
      (this.textarea as HTMLInputElement).value = '';
    }
  }

  createSettingsBottomBtn() {
    const settingsBtn = create('div', {
      parent: this.cardListBottom,
      child: '...',
    });
    return settingsBtn;
  }

  dragStartElementChange() {
    (this.cardContent as HTMLElement).classList.add(styles['black-back']);
  }

  dragEndElementChange() {
    (this.cardContent as HTMLElement).classList.remove(styles['black-back']);
  }

  showAddCardBlock() {
    if (this.addCardBlock && this.addBtn && this.bottomSettingsBtn) {
      this.addCardBlock.classList.remove(globalStyles.hidden);
      this.addBtn.classList.add(globalStyles.hidden);
      this.bottomSettingsBtn.classList.add(globalStyles.hidden);
      (this.addCardBlock.firstChild as HTMLInputElement)?.focus();
    }
  }

  closeAddCardBlock() {
    if (this.addCardBlock && this.addBtn && this.bottomSettingsBtn) {
      this.addCardBlock.classList.add(globalStyles.hidden);
      this.addBtn.classList.remove(globalStyles.hidden);
      this.bottomSettingsBtn.classList.remove(globalStyles.hidden);
    }
  }

  renderCard() {
    if (this.cardListBody) {
      renderNewCard(this.boardModel, this.cardListBody);
    }
  }

  openListMenu(event: MouseEvent) {
    const currentList = (event.target as HTMLElement).closest(
      '[data-list-wrapper]'
    );

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

  selectText(event: any) {
    event.target.select(event);
    return this;
  }

  headerTextChange(event: any) {
    this.cardContent!.dataset.listName = event.target.value;
  }
}
