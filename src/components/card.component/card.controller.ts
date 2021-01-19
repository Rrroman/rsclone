export default class CardController {
  cardViewer: any;

  constructor(public boardModel: { [key: string]: any }, public viewer: any) {
    this.cardViewer = viewer;
    this.cardViewer
      .on({
        event: 'openOverlay',
        listener: (event: Event) => this.openOverlay(event),
      })
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
      })
      .on({
        event: 'saveText',
        listener: (event: Event) => this.saveText(event),
      });
  }

  saveText(event: any) {
    this.cardViewer.saveText(event.target.value);
  }

  selectText(event: Event) {
    this.cardViewer.selectText(event);
  }

  addCardDataToPopup(event: Event) {
    this.cardViewer.addCardDataToPopup(event);
  }

  openOverlay(event: Event) {
    this.cardViewer.openOverlay(event);
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
