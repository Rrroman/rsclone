import EventEmitter from '../../utils/eventEmitter';

export default class BoardModel extends EventEmitter {
  inputNewListName: any | null;

  draggableList: HTMLElement | null;

  draggableCard: HTMLElement | null;

  cardName: string | null;

  overlayElement: HTMLElement | null;

  popupCardName: string | null;

  constructor() {
    super();
    this.inputNewListName = null;
    this.draggableList = null;
    this.draggableCard = null;
    this.cardName = null;
    this.overlayElement = null;
    this.popupCardName = null;
  }

  changeNewListName(newName: string) {
    this.inputNewListName = newName;
  }

  getNewListName() {
    return this.inputNewListName;
  }

  setDraggableList(draggableList: HTMLElement) {
    this.draggableList = draggableList;
  }

  setDraggableCard(draggableCard: HTMLElement) {
    this.draggableCard = draggableCard;
  }

  getDraggableList() {
    return this.draggableList;
  }

  getDraggableCard() {
    return this.draggableCard;
  }

  getCardName(cardNameText: string) {
    this.cardName = cardNameText;
  }

  setPopupCardName(name: string) {
    this.popupCardName = name;
  }

  getPopupCardName() {
    return this.popupCardName;
  }
}
