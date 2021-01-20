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
      });
  }

  saveText(event: any) {
    const target = event.target.closest('[data-popup]');
    const textareaValue = target.querySelector('[data-popup-textarea]').value;
    const closeButton = target.querySelector('[data-close-button]');
    this.cardViewer.saveText(textareaValue, closeButton, event);
  }

  selectText(event: Event) {
    this.cardViewer.selectText(event);
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
