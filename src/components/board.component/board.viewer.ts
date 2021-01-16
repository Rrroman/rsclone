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

  constructor(public model: any, public elements: HTMLElement) {
    super();
    this.boardWrapper = elements;
    this.board = null;
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
