import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import styles from './boardHeader.module.css';
import BoardModel from '../board.component/board.model';

export default class BoardHeaderView extends EventEmitter {
  boardContainer: HTMLElement;

  constructor(public boardModel: BoardModel, public elements: HTMLElement) {
    super();
    this.boardContainer = elements;
  }

  show() {
    this.renderBoardHeader();
  }

  renderBoardHeader() {
    if (!this.boardModel.userBoards) {
      return;
    }
    const boardName = create('div', {
      child: this.boardModel.userBoards[this.boardModel.currentBoardIndex].name,
    });

    create('div', {
      className: styles['board-header'],
      child: boardName,
      parent: this.boardContainer,
    });
  }
}
