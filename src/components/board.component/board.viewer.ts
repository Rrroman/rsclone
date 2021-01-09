import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import './board.css';
import AddListCardBtnView from '../addListCardBtn.component/addListCardBtn.view';
import AddListCardBtnController from '../addListCardBtn.component/addListCardBtn.controller';
import AddListCardBtnModel from '../addListCardBtn.component/addListCardBtn.model';

export default class Board extends EventEmitter {
  boardWrapper: HTMLElement;

  board: HTMLElement | null;

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

    const addListCardModel = new AddListCardBtnModel();
    const addNewListBtn = new AddListCardBtnView(addListCardModel, this.board);
    const addBtnElement = addNewListBtn.show();
    this.board.append(addBtnElement);
    // eslint-disable-next-line no-new
    new AddListCardBtnController(addListCardModel, addNewListBtn);
  }
}
