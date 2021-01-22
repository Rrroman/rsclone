import EventEmitter from '../../utils/eventEmitter';

export default class BoardModel extends EventEmitter {
  inputNewListName: any | null;

  draggableList: HTMLElement | null;

  draggableCard: HTMLElement | null;

  cardName: string | null;

  overlayElement: HTMLElement | null;

  popupCardName: string | null;

  dataError: null | { [key: string]: string | { [key: string]: string } };

  constructor() {
    super();
    this.inputNewListName = null;
    this.draggableList = null;
    this.draggableCard = null;
    this.cardName = null;
    this.overlayElement = null;
    this.popupCardName = null;
    this.dataError = null;
  }

  async fetchNewUser(userData: { name: string; password: string }) {
    await fetch('http://localhost:3000/api/user/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then((data: { [key: string]: string | { [key: string]: string } }) => {
        this.checkErrors(data);
        console.log(this.dataError);
      })
      .catch(alert);
  }

  async fetchCurrentUser(userData: { name: string; password: string }) {
    await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then((data: { [key: string]: string | { [key: string]: string } }) => {
        this.checkErrors(data);
        console.log(this.dataError);
      })
      .catch(alert);
  }

  checkErrors(data: {
    [key: string]: string | { [key: string]: string };
  }): void {
    if (data.errors) {
      this.dataError = data;
    } else {
      this.dataError = null;
    }
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
