export default class CardListController {
  cardListView: any;

  constructor(public model: { [key: string]: any } | null, public viewer: any) {
    this.cardListView = viewer;
    this.cardListView
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

  addCardHandler() {
    this.cardListView.showAddCardBlock();
  }

  closeAddCardHandler() {
    this.cardListView.closeAddCardBlock();
  }

  typingInTextareaHandler(event: { [key: string]: any }) {
    if (this.model) {
      this.model.getCardName(event.target.value);
    }
  }

  renderCardHandler() {
    this.cardListView.renderCard();
  }
}
