export default class CardController {
  cardViewer: any;

  constructor(public boardModel: { [key: string]: any }, public viewer: any) {
    this.cardViewer = viewer;
    this.cardViewer
      .on({
        event: 'cardClick',
        listener: (event: Event) => this.openOverlay(event),
      })
      .on({
        event: 'addPopupNameToCard',
        listener: (event: { [key: string]: string }) =>
          this.addPopupNameToCard(event),
      })
      .on({
        event: 'addCardNameToPopup',
        listener: (event: Event) => this.addCardNameToPopup(event),
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
        event: 'editPopupDescription',
        listener: () => this.editPopupDescription(),
      });
  }

  editPopupDescription() {
    console.log('Edit Descriptiong ...', this);
  }

  addPopupNameToCard(event: { [key: string]: any }) {
    this.boardModel.setPopupCardName(event.target.value);
    this.cardViewer.addPopupNameToCard();
  }

  addCardNameToPopup(event: Event) {
    this.cardViewer.addCardNameToPopup(event);
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
