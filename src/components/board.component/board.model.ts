import EventEmitter from '../../utils/eventEmitter';

export default class BoardModel extends EventEmitter {
  inputNeListName: any | null;

  draggableList: HTMLElement | null;

  draggableCard: HTMLElement | null;

  cardName: string | null;

  listViewer: any | null;

  constructor() {
    super();
    this.inputNeListName = null;
    this.draggableList = null;
    this.draggableCard = null;
    this.cardName = null;
    this.listViewer = null;
  }

  changeNewListName(newName: string) {
    this.inputNeListName = newName;
  }

  getNewListName() {
    return this.inputNeListName;
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
}
