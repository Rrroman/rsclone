import './header.css';

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
      className: 'header',
      child: null,
    });

    const headerWrapper = create('div', {
      className: 'header__wrapper',
      child: null,
      parent: header,
    });

    const headerLeftColumn = create('div', {
      className: 'header__left_column',
      child: null,
      parent: headerWrapper,
    });

    const iconMenu = createIcon('menu__icon', menuIcon);
    create('button', {
      className: 'button__burger',
      child: iconMenu,
      parent: headerLeftColumn,
    });

    const iconHome = createIcon('home__icon', homeIcon);
    create('button', {
      className: 'button__home',
      child: iconHome,
      parent: headerLeftColumn,
    });

    const iconTrello = createIcon('trello__icon', trelloIcon);
    const buttonBoard = create('button', {
      className: 'button__boards',
      child: iconTrello,
      parent: headerLeftColumn,
    });

    create('span', {
      className: 'button__boards_text',
      child: 'Boards',
      parent: buttonBoard,
    });

    const iconSearch = createIcon('search__icon', searchIcon);
    create('button', {
      className: 'button__search',
      child: iconSearch,
      parent: headerLeftColumn,
    });

    const headerLogo = create('div', {
      className: 'header__logo',
      child: null,
      parent: headerWrapper,
    });

    create('span', {
      className: 'header__loading_logo',
      child: null,
      parent: headerLogo,
    });
    create('span', {
      className: 'header__img',
      child: null,
      parent: headerLogo,
    });

    const headerRightColumn = create('div', {
      className: 'header__right_column',
      child: null,
      parent: headerWrapper,
    });

    const iconCreate = createIcon('create__icon', plusIcon);
    create('button', {
      className: 'button__create',
      child: iconCreate,
      parent: headerRightColumn,
    });

    const iconNotification = createIcon('notification__icon', notificationIcon);
    create('button', {
      className: 'button__notifications',
      child: iconNotification,
      parent: headerRightColumn,
    });

    create('button', {
      className: 'button__profile',
      child: 'UN',
      parent: headerRightColumn,
    });

    this.elements.prepend(header);
  }
}
