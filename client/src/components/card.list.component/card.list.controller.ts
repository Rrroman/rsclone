export default class CardListController {
  cardList: any;

  constructor(public boardModel: { [key: string]: any }, public viewer: any) {
    this.cardList = viewer;
    this.cardList
      .on({
        event: 'dragstart',
        listener: (card: HTMLElement) => this.dragStartFunc(card),
      })
      .on({
        event: 'dragend',
        listener: () => this.dragEndFunc(),
      })
      .on({
        event: 'addOneMoreCard',
        listener: () => this.addCardHandler(),
      })
      .on({
        event: 'closeAddCardBlock',
        listener: () => this.closeAddCardHandler(),
      })
      .on({
        event: 'addCardName',
        listener: (event: { [key: string]: any }) =>
          this.addCardNameHandler(event),
      })
      .on({
        event: 'addCard',
        listener: () => this.addCard(),
      })
      .on({
        event: 'openmenu',
        listener: (event: Event) => this.openListMenu(event),
      })
      .on({
        event: 'clearTextarea',
        listener: () => this.clearTextarea(),
      })
      .on({
        event: 'selectText',
        listener: (event: Event) => this.selectText(event),
      })
      .on({
        event: 'headerTextChange',
        listener: (event: Event) => this.headerTextChange(event),
      })
      .on({
        event: 'leaveCardContent',
        listener: (event: DragEvent) => this.leaveCardContent(event),
      })
      .on({
        event: 'dragCloneCardInList',
        listener: (event: DragEvent) => this.dragCloneCardInList(event),
      })
      .on({
        event: 'dropCard',
        listener: () => this.dropCard(),
      })
      .on({
        event: 'leaveCardBody',
        listener: (event: MouseEvent) => this.leaveCardBody(event),
      });
  }

  headerTextChange(event: Event) {
    this.cardList.headerTextChange(event);
  }

  selectText(event: Event) {
    this.cardList.selectText(event);
  }

  clearTextarea() {
    this.cardList.clearTextarea();
  }

  dragStartFunc(card: HTMLElement) {
    this.boardModel.currentListIndex = card.dataset.order;
    this.cardList.dragStartElementChange();
  }

  dragEndFunc() {
    this.cardList.dragEndElementChange();
  }

  dragCloneCardInList(event: DragEvent) {
    event.preventDefault();
    this.cardList.dragCloneCardInList(event);
  }

  leaveCardContent(event: DragEvent) {
    this.cardList.leaveCardContent(event);
  }

  leaveCardBody(event: MouseEvent) {
    this.cardList.leaveCardBody(event);
  }

  dropCard() {
    this.cardList.dropCard();
  }

  addCardHandler() {
    this.cardList.showAddCardBlock();
  }

  closeAddCardHandler() {
    this.cardList.closeAddCardBlock();
  }

  addCardNameHandler(event: { [key: string]: any }) {
    if (this.boardModel) {
      this.boardModel.setCardName(event.target.value);
    }
  }

  addCard() {
    this.cardList.renderCard();
  }

  openListMenu(event: Event) {
    this.cardList.openListMenu(event);
  }
}
