import { Board } from './../board.component/board.type';
import EventEmitter from '../../utils/eventEmitter';
import { List } from '../card.list.component/card.list.types';

export default class BoardModel extends EventEmitter {
  inputNewListName: any | null;

  draggableList: HTMLElement | null;

  draggableCard: HTMLElement | null;

  cardName: string | null;

  overlayElement: HTMLElement | null;

  popupCardName: string | null;
  headerBoardsMenuIsOpen: boolean;

  dataError: null | { [key: string]: string | { [key: string]: string } };

  dataUser: null | { [key: string]: string | { [key: string]: string } };
  userBoards: Board[] | null;
  currentBoardIndex: number;
  currentListIndex: number;

  constructor() {
    super();
    this.inputNewListName = null;
    this.draggableList = null;
    this.draggableCard = null;
    this.cardName = null;
    this.overlayElement = null;
    this.popupCardName = null;
    this.headerBoardsMenuIsOpen = false;
    this.dataError = null;
    this.dataUser = null;
    this.userBoards = [];
    this.currentBoardIndex = 0;
    this.currentListIndex = 0;
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
        this.checkUserErrors(data);
        console.log(this.dataError);
      })
      .catch(console.error);
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
        this.checkUserErrors(data);
        console.log(this.dataError);
      })
      .catch(console.error);
  }

  checkUserErrors(data: {
    [key: string]: string | { [key: string]: string };
  }): void {
    if (data.errors) {
      this.dataError = data;
    } else {
      this.dataError = null;
      this.dataUser = data;
    }
  }

  async fetchBoard() {
    console.log(this.dataUser!.name);
    await fetch(`http://localhost:3000/api/board?${this.dataUser!.name}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then((data: { [data: string]: { [data: string]: Board[] } }) => {
        this.userBoards = data.data.data;
        console.log('find board in db', this.userBoards);
      })
      .catch((err) => {
        console.log('board not found', err);
      });
  }

  async fetchNewBoard(boardData: {
    name: string;
    userName: string | { [key: string]: string };
    favorite: boolean;
  }) {
    await fetch('http://localhost:3000/api/board/newBoard', {
      method: 'POST',
      body: JSON.stringify(boardData),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        console.log('new board response', response);
        return response.json();
      })
      .then((data: { data: { data: Board } }) => {
        this.userBoards!.push(data.data.data);
        console.log('new board data.json', this.userBoards);
      })
      .catch(alert);
  }

  async fetchNewList() {
    if (typeof this.dataUser?.name !== 'string') {
      return;
    }
    const listData: List = {
      name: this.getNewListName(),
      order: 0, // then changes .................................................................................................
      userName: this.dataUser!.name,
      boardId: this.userBoards![this.currentBoardIndex]._id,
      cards: [],
    };
    console.log(listData);
    await fetch('http://localhost:3000/api/list/new', {
      method: 'POST',
      body: JSON.stringify(listData),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        console.log('new list response', response);
        return response.json();
      })
      .then((data: { data: { data: List } }) => {
        this.userBoards![this.currentBoardIndex].lists!.push(data.data.data);
        console.log(
          'new list data.json',
          this.userBoards![this.currentBoardIndex].lists
        );
      })
      .catch(alert);
  }

  async fetchListRemove() {
    console.log(
      this.userBoards![this.currentBoardIndex].lists[this.currentListIndex]._id
    );
    await fetch(
      `http://localhost:3000/api/list?${
        this.userBoards![this.currentBoardIndex].lists[this.currentListIndex]
          ._id
      }`,
      {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
      }
    )
      .then(function (response) {
        console.log('list response', response);
        return response.json();
      })
      .then((data: { [data: string]: { [data: string]: Board[] } }) => {
        console.log('list is remove', data);
      })
      .catch((err) => {
        console.log('list do not remove', err);
      });
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
