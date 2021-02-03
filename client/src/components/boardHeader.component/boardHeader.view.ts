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
      className: styles['board-name'],
      child: this.boardModel.userBoards[this.boardModel.currentBoardIndex].name,
    });

    const boardDivider = create('div', {
      className: styles['board-divider'],
      child: null,
    });

    const boardMembers = create('div', {
      className: styles['board-members'],
      child: (this.boardModel.dataUser!.name as string).slice(0, 1),
    });

    create('div', {
      className: styles['board-header'],
      child: [boardName, boardDivider, boardMembers],
      parent: this.boardContainer,
    });
  }
}
