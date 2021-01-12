import './header.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

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

    create('button', {
      className: 'button__burger',
      child: null,
      parent: headerLeftColumn,
    });
    const buttonHome = create('button', {
      className: 'button__home',
      child: null,
      parent: headerLeftColumn,
    });

    create('img', {
      className: 'button__home_icon',
      child: null,
      parent: buttonHome,
      dataAttr: [['src', '../../assets/img/homeicon2.svg']],
    });

    const buttonBoard = create('button', {
      className: 'button__boards',
      child: null,
      parent: headerLeftColumn,
    });

    create('img', {
      className: 'button__boards_icon',
      child: null,
      parent: buttonBoard,
      dataAttr: [['src', '../../assets/img/trello.svg']],
    });

    create('span', {
      className: 'button__boards_text',
      child: 'Boards',
      parent: buttonBoard,
    });
    create('button', {
      className: 'button__search',
      child: null,
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

    create('button', {
      className: 'button__create',
      child: null,
      parent: headerRightColumn,
    });

    create('button', {
      className: 'button__notifications',
      child: null,
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
