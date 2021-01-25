export default class CardController {
  cardViewer: any;

  constructor(public boardModel: { [key: string]: any }, public viewer: any) {
    this.cardViewer = viewer;
    this.cardViewer
      .on({
        event: 'addCardDataToPopup',
        listener: (event: Event) => this.addCardDataToPopup(event),
      })
      .on({
        event: 'cardDragstart',
        listener: (card: HTMLElement) => this.dragStartFunc(card),
      })
      .on({
        event: 'cardDragend',
        listener: () => this.dragEndFunc(),
      })
      .on({
        event: 'selectText',
        listener: (event: Event) => this.selectText(event),
      });
  }

  selectText(event: Event) {
    this.cardViewer.selectText(event);
    this.cardViewer.initialPopupText(event);
  }

  addCardDataToPopup(event: Event) {
    this.cardViewer.addCardDataToPopup(event);
  }

  dragStartFunc(card: HTMLElement) {
    this.boardModel.setDraggableCard(card);
    this.cardViewer.dragStartElementChange();
  }

  dragEndFunc() {
    this.cardViewer.dragEndElementChange();
    this.boardModel.setDraggableCard(null);
  }
}
