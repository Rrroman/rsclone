export default class PopupController {
  popupView: any;

  constructor(public boardModel: { [key: string]: any }, public view: any) {
    this.popupView = view;
    this.popupView
      .on({
        event: 'addPopupNameToCard',
        listener: (event: { [key: string]: HTMLTextAreaElement }) =>
          this.addPopupNameToCard(event),
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
      })
      .on({
        event: 'openSidebarPopup',
        listener: (event: Event) => this.openSidebarPopup(event),
      })
      .on({
        event: 'closeSidebarPopup',
        listener: (event: Event) => this.closeSidebarPopup(event),
      })
      .on({
        event: 'deleteCard',
        listener: () => this.deleteCard(),
      });
  }

  deleteCard() {
    this.popupView.deleteCard();
  }

  closeSidebarPopup(event: Event) {
    this.popupView.closeSidebarPopup(event.target);
  }

  openSidebarPopup(event: Event) {
    const hiddenPopup = (event.target as HTMLElement).nextElementSibling;
    const sidebarBtn = (event.target as HTMLElement).dataset.title;

    if (hiddenPopup && sidebarBtn) {
      hiddenPopup.innerHTML = '';
    }

    if (sidebarBtn) {
      this.popupView.openSidebarPopup(event);
    }
    this.popupView.renderSidebarPopupContent(event.target);
  }

  popupClose(event: Event) {
    this.popupView.popupClose(event);
  }

  addPreviousText(event: Event) {
    this.popupView.addPreviousText(event);
  }

  hideDescriptionButtons(event: Event) {
    this.popupView.hideDescriptionButtons(event);
  }

  showDescriptionButtons(event: Event) {
    this.popupView.showDescriptionButtons(event);
  }

  saveText(event: Event) {
    this.popupView.saveText(
      (event.target as HTMLTextAreaElement)!.value,
      event
    );
  }

  selectText(event: Event) {
    this.popupView.selectText(event);
    this.popupView.initialPopupText(event);
  }

  addPopupNameToCard(event: { [key: string]: HTMLTextAreaElement }) {
    this.boardModel.setPopupCardName(event.target.value);
    this.popupView.addPopupNameToCard();
  }
}
