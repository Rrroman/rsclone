import EventEmitter from '../../utils/eventEmitter';

export default class BoardModel extends EventEmitter {
  inputNeListName: any | null;

  draggableList: HTMLElement | null;

  listArr: HTMLElement[];

  cardName: string | null;

  overlayElement: HTMLElement | null;


  constructor() {
    super();
    this.inputNeListName = null;
    this.draggableList = null;
    this.listArr = [];
    this.cardName = null;
    this.overlayElement = null;
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

  getDraggableList() {
    return this.draggableList;
  }

  getCardName(cardNameText: string) {
    this.cardName = cardNameText;
  }
}
