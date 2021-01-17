import styles from './header.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import createIcon from '../../utils/createIcon';
import {
  menuIcon,
  homeIcon,
  trelloIcon,
  searchIcon,
  plusIcon,
  notificationIcon,
} from '../../utils/icons';

export default class HeaderView extends EventEmitter {
  header: HTMLElement | null;

  constructor(public model: unknown, public elements: any) {
    super();
    this.header = null;
  }

  show() {
    this.createHeader();
  }

  createHeader() {
    const header = create('header', {
      // className: styles.header,
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

    const iconMenu = createIcon(styles.menu__icon, menuIcon);
    create('button', {
      className: styles.button__burger,
      child: iconMenu,
      parent: headerLeftColumn,
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
      // className: styles.button__boards_text,
      child: 'Boards',
      parent: buttonBoard,
    });

    const iconSearch = createIcon(styles.search__icon, searchIcon);
    create('button', {
      className: styles.button__search,
      child: iconSearch,
      parent: headerLeftColumn,
    });

    const headerLogo = create('div', {
      // className: styles.header__logo,
      child: null,
      parent: headerWrapper,
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
      child: 'UN',
      parent: headerRightColumn,
    });

    this.elements.prepend(header);
  }
}
