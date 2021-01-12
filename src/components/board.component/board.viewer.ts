import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import './board.css';
import AddListCardBtnView from '../addListCardBtn.component/addListCardBtn.view';
import AddListCardBtnController from '../addListCardBtn.component/addListCardBtn.controller';
import BoardModel from './board.model';

export default class Board extends EventEmitter {
  boardWrapper: HTMLElement;

  board: HTMLElement | null;

  boardModel: any;

  constructor(public model: unknown, public elements: HTMLElement) {
    super();
    this.boardWrapper = elements;
    this.board = null;
  }

  show() {
    this.renderBoard();
  }

  renderBoard() {
    this.board = create('div', {
      className: 'board',
      child: null,
      parent: this.boardWrapper,
    });

    this.boardModel = new BoardModel();
    const addNewListBtn = new AddListCardBtnView(this.boardModel, this.board);
    const addBtnElement = addNewListBtn.show();
    this.board.append(addBtnElement);
    // eslint-disable-next-line no-new
    new AddListCardBtnController(this.boardModel, addNewListBtn);

    this.board.addEventListener('dragover', (e: Event) =>
      this.emit('dragover', e)
    );
  }

  appendDraggableList(e: MouseEvent) {
    if (this.board) {
      const closestList:
        | HTMLElement
        | null
        | undefined = this.getDragAfterElement(e.clientX);
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
    listArr.reduce(
      (closest: { [key: string]: number }, child: ChildNode) => {
        const box = (child as Element).getBoundingClientRect();
        const offset = coordinateX - (box.left + box.width / 2);

        if (offset < 0 && offset > closest.offset) {
          closestList = child;
          return { offset };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY }
    );

    // eslint-disable-next-line consistent-return
    return closestList;
  }
}
