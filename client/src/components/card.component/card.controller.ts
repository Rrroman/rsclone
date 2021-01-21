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
        event: 'addPopupNameToCard',
        listener: (event: { [key: string]: string }) =>
          this.addPopupNameToCard(event),
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
      })
      .on({
        event: 'showDescriptionButtons',
        listener: (event: Event) => this.showDescriptionButtons(event),
      })
      .on({
        event: 'addPreviousText',
        listener: (event: Event) => this.addPreviousText(event),
      })
      .on({
        event: 'hideDescriptionButtons',
        listener: (event: Event) => this.hideDescriptionButtons(event),
      })
      .on({
        event: 'popupClose',
        listener: (event: Event) => this.popupClose(event),
      });
  }

  popupClose(event: any) {
    this.cardViewer.popupClose(event);
  }
  addPreviousText(event: any) {
    this.cardViewer.addPreviousText(event);
  }

  hideDescriptionButtons(event: any) {
    this.cardViewer.hideDescriptionButtons(event);
  }

  showDescriptionButtons(event: any) {
    this.cardViewer.showDescriptionButtons(event);
  }

  saveText(event: any) {
    this.cardViewer.saveText(event.target.value, event);
  }

  selectText(event: Event) {
    this.cardViewer.selectText(event);
    this.cardViewer.initialPopupText(event);
  }

  addCardDataToPopup(event: Event) {
    this.cardViewer.addCardDataToPopup(event);
  }

  addPopupNameToCard(event: { [key: string]: any }) {
    this.boardModel.setPopupCardName(event.target.value);
    this.cardViewer.addPopupNameToCard();
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
