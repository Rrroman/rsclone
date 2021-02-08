import styles from './main.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import BoardHeaderView from '../boardHeader.component/boardHeader.view';
import Board from '../board.component/board.viewer';
import BoardController from '../board.component/board.controller';

export default class MainView extends EventEmitter {
  main!: HTMLElement;

  constructor(public boardModel: any, public mainElement: any) {
    super();
  }

  show() {
    this.createMain();
  }

  createMain() {
    const mainInner = create('div', {
      className: styles['main-inner'],
      child: null,
    });

    const boardContainer = create('div', {
      className: styles['board-main-content'],
      child: null,
      parent: mainInner,
    });

    new BoardHeaderView(this.boardModel, boardContainer).show();

    const boardWrapper = create('div', {
      className: styles['board-wrapper'],
      child: null,
      parent: boardContainer,
    });

    const boardView = new Board(this.boardModel, boardWrapper);
    boardView.show();

    // eslint-disable-next-line no-new
    new BoardController(this.boardModel, boardView);

    this.mainElement.prepend(mainInner);
  }
}
