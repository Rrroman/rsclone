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
      });
  }

  dragStartFunc(card: HTMLElement) {
    this.boardModel.setDraggableList(card.parentNode);
    this.cardList.dragStartElementChange();
  }

  dragEndFunc() {
    this.cardList.dragEndElementChange();
  }
}
