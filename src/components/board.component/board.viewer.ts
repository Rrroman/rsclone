import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import styles from './board.module.css';
import AddListCardBtnView from '../addListCardBtn.component/addListCardBtn.view';
import AddListCardBtnController from '../addListCardBtn.component/addListCardBtn.controller';
import BoardModel from './board.model';

export default class Board extends EventEmitter {
  boardWrapper: HTMLElement;

  board: HTMLElement | null;

  boardModel: any;

  dragSpeed: number;

  isDraggable: boolean;

  coorX: number;

  left: number;

  constructor(public model: any, public elements: HTMLElement) {
    super();
    this.boardWrapper = elements;
    this.board = null;
    this.dragSpeed = 2;
    this.isDraggable = false;
    this.coorX = 0;
    this.left = 0;
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

    this.boardModel = new BoardModel();
    const addNewListBtn = new AddListCardBtnView(this.boardModel, this.board);
    const addBtnElement = addNewListBtn.show();
    if (addBtnElement) {
      this.board.append(addBtnElement);
    }

    // eslint-disable-next-line no-new
    new AddListCardBtnController(this.boardModel, this.model, addNewListBtn);

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

  boardDragStart(event: MouseEvent) {
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
    if (this.board && this.boardModel.getDraggableList()) {
      const closestList:
        | HTMLElement
        | null
        | undefined = this.getDragAfterElement(event.clientX);
      if (closestList) {
        this.board.insertBefore(
          this.boardModel.getDraggableList(),
          closestList
        );
      }
    }
  }

  getDragAfterElement(coordinateX: number) {
    if (!this.board) return;
    const listArr = [...this.board.childNodes];
    let closestList: ChildNode | null = null;
    listArr.filter((child: ChildNode, index: number) => {
      const box = (child as Element).getBoundingClientRect();
      const middle = box.left + box.width / 2;

      if (coordinateX > box.left && coordinateX < middle) {
        closestList = listArr[index + 1];
        return listArr[index + 1];
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
