import EventEmitter from '../../utils/eventEmitter';

export default class BoardModel extends EventEmitter {
  inputNeListName: any | null;

  draggableList: HTMLElement | null;

  listArr: HTMLElement[];

  constructor() {
    super();
    this.inputNeListName = null;
    this.draggableList = null;
    this.listArr = [];
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
}
