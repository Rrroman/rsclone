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
        event: 'typingInTextarea',
        listener: (event: { [key: string]: any }) =>
          this.typingInTextareaHandler(event),
      })
      .on({
        event: 'addCard',
        listener: () => this.renderCardHandler(),
      });
  }

  dragStartFunc(card: HTMLElement) {
    this.boardModel.setDraggableList(card.parentNode);
    this.cardList.dragStartElementChange();
  }

  dragEndFunc() {
    this.cardList.dragEndElementChange();
  }

  addCardHandler() {
    this.cardList.showAddCardBlock();
  }

  closeAddCardHandler() {
    this.cardList.closeAddCardBlock();
  }

  typingInTextareaHandler(event: { [key: string]: any }) {
    if (this.boardModel) {
      this.boardModel.getCardName(event.target.value);
    }
  }

  renderCardHandler() {
    this.cardList.renderCard();
  }
}
