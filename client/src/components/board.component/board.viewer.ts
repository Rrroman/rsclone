import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import styles from './board.module.css';
import AddListCardBtnView from '../addListCardBtn.component/addListCardBtn.view';
import AddListCardBtnController from '../addListCardBtn.component/addListCardBtn.controller';
import CardListView from '../card.list.component/card.list.view';
import CardListController from '../card.list.component/card.list.controller';
import { List } from '../card.list.component/card.list.types';

export default class Board extends EventEmitter {
  boardWrapper: HTMLElement;
  board: HTMLElement | null;
  dragSpeed: number;
  isDraggable: boolean;
  coorX: number;
  left: number;
  listArr: ChildNode[];
  dragList: ChildNode | null;
  addBtnElement: HTMLElement | null;

  constructor(public boardModel: any, public elements: HTMLElement) {
    super();
    this.boardWrapper = elements;
    this.board = null;
    this.dragSpeed = 2;
    this.isDraggable = false;
    this.coorX = 0;
    this.left = 0;
    this.listArr = [];
    this.dragList = null;
    this.addBtnElement = null;
  }

  show() {
    this.renderBoard();
  }

  renderBoard() {
    this.board = create('div', {
      className: styles.board,
      child: null,
      parent: this.boardWrapper,
    });

    const addNewListBtn = new AddListCardBtnView(this.boardModel, this.board);
    this.addBtnElement = addNewListBtn.show();

    this.board.append(this.addBtnElement!);

    new AddListCardBtnController(this.boardModel, addNewListBtn);

    this.renderListsFromDB();

    this.board.addEventListener('dragover', (event: Event) =>
      this.emit('dragover', event)
    );
    this.board.addEventListener('mousedown', (event) =>
      this.emit('boardMousedown', event)
    );
    this.board.addEventListener('mouseup', () => this.emit('boardMouseup'));
    this.board.addEventListener('mousemove', (event) =>
      this.emit('boardMousemove', event)
    );
  }

  renderListsFromDB() {
    this.boardModel
      .fetchAllLists()
      .then(() => {
        this.boardModel.userBoards[this.boardModel.currentBoardIndex].lists
          .sort((a: List, b: List) => {
            return a.order - b.order;
          })
          .forEach((list: List, index: number) => {
            this.boardModel.currentListIndex = index;
            this.boardModel.changeNewListName(list.name);

            const listView = new CardListView(this.boardModel, this.board);
            new CardListController(this.boardModel, listView);

            listView.show(this.addBtnElement);
          });
      })
      .catch((err: Error) => console.log('error in render List from DB', err));
  }

  boardMousedown(event: MouseEvent) {
    if (
      this.board &&
      event.target &&
      (event.target === this.board ||
        (event.target as HTMLElement).dataset.listWrapper)
    ) {
      this.isDraggable = true;
      this.coorX = event.pageX - this.board.offsetLeft;
    }
  }

  boardDragMove(event: MouseEvent) {
    if (this.isDraggable && this.board) {
      this.board.scrollLeft =
        this.left +
        (event.pageX - this.board.offsetLeft - this.coorX) * this.dragSpeed;
    }
  }

  boardDragStop() {
    if (this.board) {
      this.isDraggable = false;
      this.left = this.board.scrollLeft;
    }
  }

  appendDraggableList(event: MouseEvent) {
    if (this.board && this.boardModel.dragElementName === 'list') {
      const closestList:
        | HTMLElement
        | null
        | undefined = this.getDragAfterElement(event.clientX);
      if (closestList) {
        this.board!.insertBefore(this.dragList as Node, closestList);
      }
    }
  }

  getDragAfterElement(coordinateX: number) {
    this.listArr = [...this.board!.childNodes];
    let closestList: ChildNode | null = null;

    this.listArr.filter((child: ChildNode, index: number) => {
      const box = (child as Element).getBoundingClientRect();
      const middle = box.left + box.width / 2;

      if (
        (child.firstChild as HTMLElement).dataset.order ===
        this.boardModel.currentListIndex
      ) {
        this.dragList = child;
      }

      if (coordinateX > box.left && coordinateX < middle) {
        closestList = this.listArr[index + 1];
        return this.listArr[index + 1];
      }

      if (coordinateX > middle && coordinateX < box.right) {
        closestList = child;
        return child;
      }
      return false;
    });

    // eslint-disable-next-line consistent-return
    return closestList;
  }
}
