import styles from './header.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import createIcon from '../../utils/createIcon';
import {
  homeIcon,
  trelloIcon,
  searchIcon,
  plusIcon,
  notificationIcon,
} from '../../utils/icons';

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
    const header = create('header', {
      child: null,
    });

    const headerWrapper = create('div', {
      className: styles.header__wrapper,
      child: null,
      parent: header,
    });

    const headerLeftColumn = create('div', {
      className: styles.header__left_column,
      child: null,
      parent: headerWrapper,
    });

    const headerLogo = create('div', {
      child: null,
      parent: headerWrapper,
    });

    const headerRightColumn = create('div', {
      className: styles.header__right_column,
      child: null,
      parent: headerWrapper,
    });

    const iconCreate = createIcon(styles.create__icon, plusIcon);
    create('button', {
      className: styles.button__create,
      child: iconCreate,
      parent: headerRightColumn,
    });

    const iconNotification = createIcon(
      styles.notification__icon,
      notificationIcon
    );
    create('button', {
      className: styles.button__notifications,
      child: iconNotification,
      parent: headerRightColumn,
    });

    create('button', {
      className: styles.button__profile,
      child: (this.boardModel.dataUser!.name as string).slice(0, 1),
      parent: headerRightColumn,
    });

    create('span', {
      className: styles.header__loading_logo,
      child: null,
      parent: headerLogo,
    });
    create('span', {
      className: styles.header__img,
      child: null,
      parent: headerLogo,
    });

    const iconHome = createIcon(styles.home__icon, homeIcon);
    create('button', {
      className: styles.button__home,
      child: iconHome,
      parent: headerLeftColumn,
    });

    const iconTrello = createIcon(styles.trello__icon, trelloIcon);
    const buttonBoard = create('button', {
      className: styles.button__boards,
      child: iconTrello,
      parent: headerLeftColumn,
    });

    create('span', {
      child: 'Boards',
      parent: buttonBoard,
    });

    const iconSearch = createIcon(styles.search__icon, searchIcon);
    create('button', {
      className: styles.button__search,
      child: iconSearch,
      parent: headerLeftColumn,
    });

    this.body.prepend(header);

    buttonBoard.addEventListener('click', () => this.emit('openBoardMenu'));
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
