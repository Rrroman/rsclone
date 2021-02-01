import styles from './card.list.module.css';
import globalStyles from '../../globals.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import ListMenu from '../listMenu.component/listMenu.view';
import ListMenuController from '../listMenu.component/listMenu.controller';
import { renderTextArea } from '../user.kit.component/user.kit.components';
import renderNewCard from '../user.kit.component/user.kit.render.component';
import { List } from './card.list.types';
import { Card } from '../card.component/card.types';

export default class CardListView extends EventEmitter {
  cardListBottom: HTMLElement | null;

  addCardBlock: HTMLElement | null;

  addBtn: HTMLElement | null;

  bottomSettingsBtn: HTMLElement | null;

  cardListBody: HTMLElement | null;

  cardList: HTMLElement | null;

  textarea: HTMLElement | null;

  cardContent: HTMLElement | null;

  dragCard: ChildNode | null;

  draggableCardData: null | Card;

  dragCardCLoneBlack: HTMLElement | null;

  dropCardIndex: null | number;

  currentListIndex: null | number;

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
    this.dragCard = null;
    this.draggableCardData = null;

    this.dragCardCLoneBlack = null;
    this.dropCardIndex = null;
    this.currentListIndex = null;
  }

  show(insertBeforeElement: null | HTMLElement) {
    this.createCardList();
    this.appendList(insertBeforeElement);
    this.renderCardsFromDB();
  }

  createCardList() {
    const cardListHeader = this.createListHeader();
    this.cardListBody = create('div', {
      className: styles['card-list__body'],
    });

    const cardListBottom = this.createAddBottomBtn();

    const currentListOrder: number =
      this.boardModel.userBoards![this.boardModel.currentBoardIndex].lists[
        this.boardModel.currentListIndex
      ].order;

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

    this.cardContent.addEventListener('dragleave', (event: DragEvent) => {
      // if ((event.target as HTMLElement).dataset.cards) {
      this.emit('leaveCardContent', event);
      // }
    });

    this.cardContent.addEventListener('dragover', (event) => {
      if (this.boardModel.dragElementName === 'card') {
        this.emit('dragCloneCardInList', event);
      }
    });

    this.cardContent.addEventListener('drop', () => this.emit('dropCard'));
  }

  appendList(insertBeforeElement: null | HTMLElement) {
    this.board.insertBefore(
      this.cardList,
      insertBeforeElement || this.board.lastChild
    );
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

    this.addBtn.addEventListener('click', (event) => {
      if (!event.detail || event.detail == 1) {
        this.emit('addOneMoreCard');
      }
    });

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

    const addCardBtn = create('input', {
      className: styles['add-card-block__add-card-btn'],
      child: null,
      parent: controlsButtons,
      dataAttr: [
        ['type', 'submit'],
        ['value', 'Add Card'],
      ],
    });

    addCardBtn.addEventListener('click', (event) => {
      if (!event.detail || event.detail == 1) {
        this.emit('addCard');
      }
    });
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
      child: [controlsButtons],
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
    this.boardModel.dragElementName = 'list';
    (this.cardContent as HTMLElement).classList.add(styles['black-back']);
  }

  dragEndElementChange() {
    (this.cardContent as HTMLElement).classList.remove(styles['black-back']);

    this.updateBoardModelListsOrder();
    this.updateDBListsOrder();
  }

  updateBoardModelListsOrder() {
    this.board.childNodes.forEach((child: HTMLElement) => {
      this.boardModel.listPositionArray.push(
        Number((child.firstChild as HTMLElement).dataset.order)
      );
    });

    const length = this.boardModel.userBoards[this.boardModel.currentBoardIndex]
      .lists.length;

    for (let i = 0; i < length; i += 1) {
      const currentOrder = this.boardModel.userBoards[
        this.boardModel.currentBoardIndex
      ].lists[i].order;

      const newOrder = this.boardModel.listPositionArray.indexOf(currentOrder);
      this.boardModel.userBoards[this.boardModel.currentBoardIndex].lists[
        i
      ].order = newOrder;
    }

    this.board.childNodes.forEach((list: HTMLElement, index: number) => {
      if (index < length) {
        (list.firstChild as HTMLElement).dataset.order = index.toString();
      }
    });

    this.boardModel.listPositionArray = [];
  }

  updateDBListsOrder() {
    this.boardModel.userBoards[this.boardModel.currentBoardIndex].lists.forEach(
      (list: List, index: number) => {
        this.boardModel.currentListIndex = index;
        this.boardModel
          .updateListsDB({ order: list.order })
          .catch((err: Error) =>
            console.log('cant update list order in DB', err)
          );
      }
    );
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

  renderCardsFromDB() {
    // this.boardModel.currentListIndex = Number(this.cardContent?.dataset.order);
    this.currentListIndex = Number(this.cardContent?.dataset.order);

    const currentListId = this.boardModel.userBoards[
      this.boardModel.currentBoardIndex
    ].lists[this.currentListIndex]._id;

    this.boardModel
      .fetchAllCardsForList(currentListId)
      .then(() => {
        this.boardModel.userBoards[this.boardModel.currentBoardIndex].lists[
          this.currentListIndex!
        ].cards
          .sort((a: Card, b: Card) => {
            return a.order - b.order;
          })
          .forEach((card: Card) => {
            const currentCardIndex = Number(card.order);
            const newCard: HTMLElement = renderNewCard(
              this.boardModel,
              this.cardListBody!,
              currentCardIndex,
              this.currentListIndex!
            );
            this.cardListBody!.append(newCard);
          });
      })
      .catch((err: Error) => console.log('error in render List from DB', err));
  }

  renderCard() {
    this.currentListIndex = Number(this.cardContent?.dataset.order);
    const cardOrder: number = this.boardModel.userBoards![
      this.boardModel.currentBoardIndex
    ].lists[this.currentListIndex].cards.length;

    this.boardModel.createNewCard(this.currentListIndex, cardOrder).then(() => {
      const newCard: HTMLElement = renderNewCard(
        this.boardModel,
        this.cardListBody!,
        cardOrder,
        this.currentListIndex!
      );

      this.cardListBody!.append(newCard);
    });
  }

  openListMenu(event: MouseEvent) {
    this.boardModel.currentListIndex = this.cardList?.dataset.order;
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

  leaveCardContent(event: DragEvent) {
    console.log(event);
    if (event.offsetX > 272 || event.offsetX < 0) {
      this.boardModel.dragCardIsCreated = false;
      this.dragCardCLoneBlack?.remove();
      this.dragCardCLoneBlack = null;
      this.dragCard = null;
    }
  }
  dragCloneCardInList(event: MouseEvent) {
    if (!this.dragCardCLoneBlack) {
      this.dragCardCLoneBlack = create('div', {
        className: styles['clone-black-card'],
      });

      this.boardModel.dragCardIsCreated = true;
      this.currentListIndex = Number(this.cardContent?.dataset.order);
      this.boardModel.setCardName('');
      this.boardModel.currentListIndex = this.currentListIndex;
    }

    if (this.cardListBody && this.cardListBody.childNodes.length === 0) {
      this.cardListBody.append(this.dragCardCLoneBlack);
      this.dropCardIndex = 0;
    } else {
      this.dragOverAppendCard(event);
    }
  }

  dragOverAppendCard(event: MouseEvent) {
    if (this.cardListBody) {
      const closestCard:
        | {
            element: null | ChildNode;
          }
        | undefined = this.getDragAfterElement(event.clientY);
      if (closestCard) {
        this.cardListBody.insertBefore(
          this.dragCardCLoneBlack as Node,
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
      (closest: { [key: string]: number }, child: ChildNode, index: number) => {
        const box = (child as Element).getBoundingClientRect();
        const offset = coordinateY - (box.top + box.height / 2);

        if (offset < 0 && offset > closest.offset) {
          closestCard.element = child;
          this.dropCardIndex = index;
          return { offset };
        }

        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY }
    );

    // eslint-disable-next-line consistent-return
    return closestCard;
  }

  dropCard() {
    const cardOrder: number = this.boardModel.userBoards![
      this.boardModel.currentBoardIndex
    ].lists[this.currentListIndex!].cards.length; // 0

    this.boardModel.setCardName(this.boardModel.draggableCardData!.name);
    this.boardModel
      .createNewCard(this.currentListIndex, cardOrder) // data + 1, DB + 1,
      .then(() => {
        this.dragCard = renderNewCard(
          this.boardModel,
          this.cardListBody!,
          cardOrder,
          this.currentListIndex!
        );
      })
      .then(() => {
        this.cardListBody!.insertBefore(
          // list + 1
          this.dragCard as Node,
          this.dragCardCLoneBlack
        );
        this.dragCardCLoneBlack!.remove();
        this.dragCardCLoneBlack = null;
        console.log('inser befor', this.cardListBody);
      })
      .then(() => {
        const boardIndex = this.boardModel.currentBoardIndex;
        console.log('for loop', this.cardListBody);
        const cardElementList = this.cardListBody!.childNodes;
        this.currentListIndex = Number(this.cardContent?.dataset.order);
        const length: number = this.cardListBody!.childNodes.length;

        console.log(
          this.cardListBody!.childNodes,
          this.dropCardIndex,
          length,
          this.boardModel.userBoards![boardIndex].lists[this.currentListIndex!]
            .cards
        );

        for (let i = this.dropCardIndex!; i <= length - 1; i += 1) {
          console.log(cardElementList[i]);
          const cardCurrentOrder: number = Number(
            (cardElementList[i] as HTMLElement).dataset.order
          );

          this.boardModel.updateCardDB(
            this.boardModel.userBoards[boardIndex].lists[this.currentListIndex!]
              .cards[cardCurrentOrder]._id,
            { order: i.toString() }
          );

          this.boardModel.updateCardModelData(
            this.currentListIndex,
            cardCurrentOrder,
            i
          );

          (this.cardListBody!.children[
            i
          ] as HTMLElement).dataset.order = i.toString();
        }
      })
      .then(() => {
        this.boardModel.userBoards[this.boardModel.currentBoardIndex].lists[
          this.currentListIndex!
        ].cards.sort((a: Card, b: Card) => a.order - b.order);
      })
      .catch((err: Error) =>
        console.log('can not create and append draggable card from DB', err)
      );
  }

  selectText(event: any) {
    event.target.select(event);
    return this;
  }

  headerTextChange(event: any) {
    this.boardModel.currentListIndex = Number(this.cardContent!.dataset.order);
    this.boardModel
      .updateListsDB({
        name: event.target.value,
      })
      .then(() => {
        this.boardModel.userBoards[this.boardModel.currentBoardIndex].lists[
          this.boardModel.currentListIndex
        ].name = event.target.value;
      })
      .catch((err: Error) =>
        console.log('err update list name in DB in card.list.view', err)
      );

    this.cardContent!.dataset.listName = event.target.value;
  }
}
