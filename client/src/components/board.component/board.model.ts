import { Board } from './../board.component/board.type';
import EventEmitter from '../../utils/eventEmitter';
import { List } from '../card.list.component/card.list.types';
import { Card } from '../card.component/card.types';

export default class BoardModel extends EventEmitter {
  serverUrl: string;

  inputNewListName: any | null;

  draggableList: HTMLElement | null;

  draggableCard: HTMLElement | null;

  cardName: string | null;
  description: string;

  overlayElement: HTMLElement | null;

  popupCardName: string | null;
  headerBoardsMenuIsOpen: boolean;

  dataError:
    | null
    | { [key: string]: string | { [key: string]: string } }
    | string;

  tokenError: null | { error: string };

  dataUser: null | { [key: string]: string | { [key: string]: string } };
  userBoards: Board[] | null;
  currentBoardIndex: number;
  currentListIndex: number;

  startDropListIndex: number;
  listPositionArray: number[];
  currentCardIndex: number;
  dragElementName: string;

  dragCardIsCreated: boolean;

  draggableCardData: null | Card;

  constructor() {
    super();
    this.serverUrl = 'https://rs-trello-clone.herokuapp.com/';
    this.inputNewListName = null;
    this.draggableList = null;
    this.draggableCard = null;
    this.cardName = null;
    this.description = '';
    this.overlayElement = null;
    this.popupCardName = null;
    this.headerBoardsMenuIsOpen = false;
    this.dataError = null;
    this.tokenError = null;
    this.dataUser = null;
    this.userBoards = [];
    this.currentBoardIndex = 0;
    this.currentListIndex = 0;
    this.startDropListIndex = 0;
    this.listPositionArray = [];
    this.currentCardIndex = 0;
    this.dragElementName = '';
    this.dragCardIsCreated = false;
    this.draggableCardData = null;
  }

  async fetchNewUser(userData: { name: string; password: string }) {
    await fetch(`${this.serverUrl}api/user/register`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then(
        (data: {
          errors?: { errors: { [key: string]: string } };
          error: string | null;
          token: { token: string };
          data: { [key: string]: string };
        }) => {
          this.checkUserErrors(data);
        }
      )
      .catch((err: Error) => console.log(err));
  }

  async fetchCurrentUser(userData: { name: string; password: string }) {
    await fetch(`${this.serverUrl}api/user/login`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then(
        (data: {
          errors?: string;
          error: string | null;
          token: { token: string };
          data: { [key: string]: string };
        }) => {
          this.checkUserErrors(data);
        }
      )
      .catch((err: Error) => console.log(err));
  }

  checkUserErrors(data: {
    errors?: string | { errors: { [key: string]: string } };
    error: string | null;
    token: { token: string };
    data: { [key: string]: string };
  }): void {
    if (data.errors) {
      this.dataError = data.errors;
    } else {
      this.dataError = null;
      this.dataUser = data.data;
      localStorage.setItem('token', data.token.token);
      localStorage.setItem('user', data.data.name);
    }
  }

  async fetchBoard() {
    await fetch(`${this.serverUrl}api/board/${this.dataUser!.name}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then((data: { [data: string]: { [data: string]: Board[] } }) => {
        if (data.error) {
          this.tokenError = { error: 'invalid token' };
          throw new Error('invalid token');
        } else {
          this.userBoards = data.data.data;
          this.tokenError = null;
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  async createNewBoard(boardData: {
    name: string;
    userName: string | { [key: string]: string };
    favorite: boolean;
  }) {
    await fetch(`${this.serverUrl}api/board/newBoard`, {
      method: 'POST',
      body: JSON.stringify(boardData),
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
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
      boardId: this.userBoards![this.currentBoardIndex]._id,
      cards: [],
    };
    await fetch(`${this.serverUrl}api/list/new`, {
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
      `${this.serverUrl}api/list/${
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

    const length = this.userBoards![this.currentBoardIndex].lists.length;
    for (let i = this.currentListIndex; i < length; i += 1) {
      this.userBoards![this.currentBoardIndex].lists[i].order = i;
    }
  }

  async updateListsDB(data: List) {
    if (typeof this.dataUser?.name !== 'string') {
      return;
    }
    const currentListId = this.userBoards![this.currentBoardIndex].lists[
      this.currentListIndex
    ]._id;
    await fetch(`${this.serverUrl}api/list/${currentListId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
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
    } = {
      boardId: this.userBoards![this.currentBoardIndex]._id,
    };

    await fetch(`${this.serverUrl}api/list/all`, {
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

  async createNewCard(currentListIndex: number, cardOrder: number) {
    if (typeof this.dataUser?.name !== 'string') {
      return;
    }
    const cardData: Card = {
      name: this.getCardName(),
      order: cardOrder,
      description: this.description,
      listId: this.userBoards![this.currentBoardIndex].lists[currentListIndex]
        ._id!,
      listName: this.userBoards![this.currentBoardIndex].lists[currentListIndex]
        .name,
      checklists: [],
      labelColorId: '',
      labelTextId: '',
    };
    await fetch(`${this.serverUrl}api/card/new`, {
      method: 'POST',
      body: JSON.stringify(cardData),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then((data: { data: { data: Card } }) => {
        this.userBoards![this.currentBoardIndex].lists[
          currentListIndex
        ].cards.push(data.data.data);
      })
      .catch((err) => console.log('do not create new List server error', err));
  }

  async fetchAllCardsForList(currentListId: string) {
    const listIndex: number = this.currentListIndex;
    await fetch(`${this.serverUrl}api/card/all`, {
      method: 'POST',
      body: JSON.stringify({
        listId: currentListId,
      }),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then((data: { data: { data: Card[] } }) => {
        this.userBoards![this.currentBoardIndex].lists[listIndex].cards =
          data.data.data;
      })
      .catch(console.error);
  }

  async removeCardFromDB(listIndex: number, cardIndex: number) {
    await fetch(
      `${this.serverUrl}api/card/${
        this.userBoards![this.currentBoardIndex].lists[listIndex].cards[
          cardIndex
        ]._id
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
        console.log('card do not remove', err);
      });
  }

  async deleteAllCardById(listID: string) {
    await fetch(`${this.serverUrl}api/card/deleteAll/${listID}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .catch((err) => {
        console.log('card do not remove', err);
      });
  }

  async updateCardDB(cardId: string, data: { [key: string]: string }) {
    if (typeof this.dataUser?.name !== 'string') {
      return;
    }

    await fetch(`${this.serverUrl}api/card/${cardId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .catch(alert);
  }

  updateCardModelData(
    currentListIndex: number,
    cardIndex: number,
    newOrder: number
  ) {
    if (this.userBoards) {
      this.userBoards[this.currentBoardIndex].lists[currentListIndex].cards[
        cardIndex
      ].order = newOrder;
    }
  }

  removeCardFromData(listIndex: number, cardIndex: number) {
    this.userBoards![this.currentBoardIndex].lists[listIndex].cards.splice(
      cardIndex,
      1
    );
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

  setCardName(cardNameText: string) {
    this.cardName = cardNameText;
  }

  getCardName() {
    if (this.cardName) {
      return this.cardName;
    }
    return '';
  }

  setPopupCardName(name: string) {
    this.popupCardName = name;
  }

  getPopupCardName() {
    return this.popupCardName;
  }
}
