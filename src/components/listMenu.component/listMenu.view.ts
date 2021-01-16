import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import styles from './listMenu.module.css';

export default class ListMenu extends EventEmitter {
  menuBody: null | HTMLElement;

  menuElement: null | HTMLElement;

  menuList: null | HTMLElement;

  constructor(
    public boardModel: any,
    public board: HTMLElement,
    public currentList: HTMLElement
  ) {
    super();
    this.menuBody = null;
    this.menuElement = null;
    this.menuList = null;
  }

  show() {
    this.renderListMenu();
  }

  renderListMenu() {
    const closeBtn = create('div', {
      className: styles['close-menu'],
      child: '&times;',
    });

    const menuHeader = create('div', {
      className: styles['menu-header'],
      child: [
        create('span', {
          className: styles['header-name'],
          child: 'List Actions',
        }),
        closeBtn,
      ],
    });

    this.menuBody = create('div', { className: styles['menu-body'] });
    this.menuElement = create('div', {
      className: styles['menu-container'],
      child: [menuHeader, this.menuBody],
      parent: this.board.parentNode as HTMLElement,
    });

    this.menuAlign();
    this.renderMenuBody();

    closeBtn.addEventListener('click', (event: Event) => {
      event.stopPropagation();
      this.emit('closemenu');
    });

    document.addEventListener('click', (event: MouseEvent) => {
      if (
        event.target &&
        this.menuElement &&
        !this.menuElement.contains(event.target as HTMLElement)
      ) {
        this.emit('closemenu');
      }
    });
  }

  renderMenuBody() {
    const addListBtn = create('li', {
      // className: styles['list-item'],
      child: create('a', {
        className: styles['list-link'],
        child: 'Add card...',
      }),
    });
    const copyListBtn = create('li', {
      // className: styles['list-item'],
      child: create('a', {
        className: styles['list-link'],
        child: 'Copy List...',
      }),
    });
    const moveListBtn = create('li', {
      // className: styles['list-item'],
      child: create('a', {
        className: styles['list-link'],
        child: 'Move List...',
      }),
    });
    this.menuList = create('ul', {
      // className: styles['menu-list'],
      child: [addListBtn, copyListBtn, moveListBtn],
      parent: this.menuBody,
    });

    addListBtn.addEventListener('click', () => this.emit('addCardEvent'));
    copyListBtn.addEventListener('click', () => this.emit('copyListEvent'));
  }

  menuAlign() {
    if (!this.menuElement) {
      return;
    }
    const listRect = this.currentList.getBoundingClientRect();
    const bodyWidth = this.board.getBoundingClientRect().width;
    const menuWidth = this.menuElement.getBoundingClientRect().width;
    const listRight = bodyWidth - listRect.right;
    const menuMarginLeft = 20;
    if (listRight > menuWidth - menuMarginLeft) {
      this.menuElement.setAttribute(
        'style',
        `left: ${listRect.right - menuMarginLeft}px`
      );
    }
  }

  closeMenu() {
    if (this.menuElement) {
      this.menuElement.remove();
    }
  }

  addCardHandler() {
    this.boardModel.listViewer.showAddCardBlock();
    this.closeMenu();
  }

  copyListHandler() {
    const clone: Node = this.currentList.cloneNode(true);
    this.board.insertBefore(clone, this.board.lastChild);
  }
}
