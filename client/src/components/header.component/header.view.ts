import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import styles from './header.module.css';

import BoardModel from '../board.component/board.model';

import HeaderBoardsMenuView from '../header.boardsMenu.component/header.boardsMenu.view';
import HeaderBoardsMenuController from '../header.boardsMenu.component/header.boardsMenu.controller';

export default class HeaderView extends EventEmitter {
  header: HTMLElement | null;
  menuWrapper: HTMLElement | null;
  addBoardText: HTMLElement | null;
  inputForm: HTMLElement | null;
  input: HTMLElement | null;

  constructor(
    public boardModel: BoardModel,
    public body: any,
    public mainElement: HTMLElement
  ) {
    super();
    this.header = null;
    this.menuWrapper = null;
    this.addBoardText = null;
    this.inputForm = null;
    this.input = null;
  }

  show() {
    this.createHeader();
  }

  createHeader() {
    const boardButton = create('button', {
      className: styles['header-buttons'],
      child: [
        create('span', {
          className: styles['header-buttons_text'],
          child: 'Boards',
        }),
      ],
    });

    const leftBlock = create('div', {
      className: styles['left-block'],
      child: boardButton,
    });

    const logo = create('h1', {
      className: styles['header-title'],
      child: 'Trello',
    });

    const header = create('header', {
      className: styles.header,
      child: [leftBlock, logo],
    });

    this.body.prepend(header);

    boardButton.addEventListener('click', () => this.emit('openBoardMenu'));
  }

  openBoardMenu() {
    if (this.boardModel.headerBoardsMenuIsOpen) {
      return;
    }
    const headerBoardsMenu = new HeaderBoardsMenuView(
      this.boardModel,
      this.body,
      this.mainElement
    );
    headerBoardsMenu.show();
    this.boardModel.headerBoardsMenuIsOpen = true;

    new HeaderBoardsMenuController(this.boardModel, headerBoardsMenu);
  }
}
