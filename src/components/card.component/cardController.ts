export default class CardController {
  card: any;

  constructor(public boardModel: { [key: string]: any }, public viewer: any) {
    this.card = viewer;
    this.card
      .on({
        event: 'cardDragstart',
        listener: (card: HTMLElement) => this.dragStartFunc(card),
      })
      .on({
        event: 'cardDragend',
        listener: () => this.dragEndFunc(),
      });
  }

  dragStartFunc(card: HTMLElement) {
    this.boardModel.setDraggableCard(card);
    this.card.dragStartElementChange();
  }

  dragEndFunc() {
    this.card.dragEndElementChange();
    this.boardModel.setDraggableCard(null);
  }
}
