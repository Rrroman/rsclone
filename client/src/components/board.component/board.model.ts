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
  listPositionArray: number[];

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
    this.listPositionArray = [];
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
    await fetch(`http://localhost:3000/api/board/${this.dataUser!.name}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then((data: { [data: string]: { [data: string]: Board[] } }) => {
        this.userBoards = data.data.data;
      })
      .catch((err) => {
        console.log('board not found', err);
      });
  }

  async createNewBoard(boardData: {
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
        return response.json();
      })
      .then((data: { data: { data: Board } }) => {
        this.userBoards!.push(data.data.data);
      })
      .catch(alert);
  }

  async createAndLoadNewList() {
    if (typeof this.dataUser?.name !== 'string') {
      return;
    }
    this.currentListIndex = this.userBoards![
      this.currentBoardIndex
    ].lists.length;
    const listData: List = {
      name: this.getNewListName(),
      order: this.currentListIndex,
      userName: this.dataUser!.name,
      boardId: this.userBoards![this.currentBoardIndex]._id,
      cards: [],
    };
    await fetch('http://localhost:3000/api/list/new', {
      method: 'POST',
      body: JSON.stringify(listData),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then((data: { data: { data: List } }) => {
        this.userBoards![this.currentBoardIndex].lists!.push(data.data.data);
      })
      .catch(alert);
  }

  async removeListFromDB() {
    await fetch(
      `http://localhost:3000/api/list/${
        this.userBoards![this.currentBoardIndex].lists[this.currentListIndex]
          ._id
      }`,
      {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .catch((err) => {
        console.log('list do not remove', err);
      });
  }

  removeListFromData() {
    this.userBoards![this.currentBoardIndex].lists.splice(
      this.currentListIndex,
      1
    );
  }

  async updateListsDB(data: List) {
    if (typeof this.dataUser?.name !== 'string') {
      return;
    }
    const currentListId = this.userBoards![this.currentBoardIndex].lists[
      this.currentListIndex
    ]._id;
    await fetch(`http://localhost:3000/api/list/${currentListId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name:
          data.name ||
          this.userBoards![this.currentBoardIndex].lists[this.currentListIndex]
            .name,
        order:
          data.order ||
          this.userBoards![this.currentBoardIndex].lists[this.currentListIndex]
            .order,
      }),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .catch(alert);
  }

  async fetchAllLists() {
    if (typeof this.dataUser?.name !== 'string') {
      return;
    }

    const listData: {
      boardId: string;
      userName: string;
    } = {
      boardId: this.userBoards![this.currentBoardIndex]._id,
      userName: this.dataUser!.name,
    };

    await fetch('http://localhost:3000/api/list/all', {
      method: 'POST',
      body: JSON.stringify(listData),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then((data: { data: { data: List[] } }) => {
        this.userBoards![this.currentBoardIndex].lists = data.data.data;
      })
      .catch(console.error);
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
