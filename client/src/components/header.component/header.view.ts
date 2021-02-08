import styles from './header.module.css';
import globalStyles from '../../globals.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import createIcon from '../../utils/createIcon';
import { trelloIcon } from '../../utils/icons';

import BoardModel from '../board.component/board.model';

import HeaderBoardsMenuView from '../header.boardsMenu.component/header.boardsMenu.view';
import HeaderBoardsMenuController from '../header.boardsMenu.component/header.boardsMenu.controller';

export default class HeaderView extends EventEmitter {
  header: HTMLElement | null;
  menuWrapper: HTMLElement | null;
  addBoardText: HTMLElement | null;
  inputForm: HTMLElement | null;
  input: HTMLElement | null;
  logoutButton: HTMLElement | null;

  buttonBoard: HTMLElement | null;

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
    this.buttonBoard = null;
    this.logoutButton = null;
  }

  show() {
    this.createHeader();
  }

  createHeader() {
    const header = create('header', {});

    const headerWrapper = create('div', {
      className: styles.header__wrapper,
      parent: header,
    });

    const headerLeftColumn = create('div', {
      className: styles.header__left_column,
      parent: headerWrapper,
    });

    const headerLogo = create('div', {
      parent: headerWrapper,
    });

    this.logoutButton = create('button', {
      className: `${styles['logout-button']} ${globalStyles.hidden}`,
      child: 'Logout',
    });

    this.logoutButton.addEventListener('click', (event: Event) =>
      this.emit('logout', event)
    );

    const headerRightColumn = create('div', {
      className: styles.header__right_column,
      child: this.logoutButton,
      parent: headerWrapper,
    });

    const profileButton = create('button', {
      className: styles['button__profile'],
      child: (this.boardModel.dataUser!.name as string).slice(0, 1),
      parent: headerRightColumn,
    });

    profileButton.addEventListener('click', (event: Event) =>
      this.emit('toggleLogout', event)
    );

    create('span', {
      className: styles.header__img,
      parent: headerLogo,
    });

    const iconTrello = createIcon(styles.trello__icon, trelloIcon);
    this.buttonBoard = create('button', {
      className: styles.button__boards,
      child: iconTrello,
      parent: headerLeftColumn,
    });

    create('span', {
      child: 'Boards',
      parent: this.buttonBoard,
    });

    this.body.prepend(header);

    this.buttonBoard.addEventListener('click', () =>
      this.emit('openBoardMenu')
    );
  }

  openBoardMenu() {
    if (this.boardModel.headerBoardsMenuIsOpen) {
      return;
    }
    const headerBoardsMenu = new HeaderBoardsMenuView(
      this.boardModel,
      this.body,
      this.mainElement,
      this.buttonBoard!
    );
    headerBoardsMenu.show();
    this.boardModel.headerBoardsMenuIsOpen = true;

    new HeaderBoardsMenuController(this.boardModel, headerBoardsMenu);
  }

  toggleLogout() {
    this.logoutButton?.classList.toggle(globalStyles.hidden);
  }

  logout() {
    localStorage.clear();
    location.reload();
  }
}
