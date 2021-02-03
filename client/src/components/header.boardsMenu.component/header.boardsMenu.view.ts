import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import styles from './header.boardsMenu.module.css';
import globalStyles from '../../globals.module.css';
import BoardModel from '../board.component/board.model';
import {
  addBtn,
  closeBtn,
  inputElement,
} from '../user.kit.component/user.kit.components';
import MainView from '../main.component/main.view';

export default class HeaderBoardsMenuView extends EventEmitter {
  menuWrapper: HTMLElement | null;
  addBoardText: HTMLElement | null;
  inputForm: HTMLElement | null;
  input: HTMLInputElement | null;
  deleteBoard: HTMLElement | null;

  constructor(
    public boardModel: BoardModel,
    public body: HTMLElement,
    public mainElement: HTMLElement
  ) {
    super();
    this.menuWrapper = null;
    this.addBoardText = null;
    this.inputForm = null;
    this.input = null;
    this.deleteBoard = null;
  }

  show() {
    this.openBoardMenu();
  }

  openBoardMenu() {
    this.menuWrapper = create('div', {
      className: styles['board-menu-wrapper'],
    });

    const menuHeader = this.menuHeader();
    const menuBody = this.menuBody();
    const menuAddBoard = this.menuAddBoard();

    create('div', {
      className: styles['board-menu'],
      parent: this.menuWrapper,
      child: [menuHeader, menuBody, menuAddBoard],
    });

    document.body.append(this.menuWrapper);
  }

  menuHeader() {
    const search = create('div', { child: '' });
    const close = closeBtn();
    const header = create('div', {
      className: styles['menu-header'],
      child: [search, close],
    });

    close.addEventListener('click', () => this.emit('closeMenu'));

    return header;
  }

  menuBody() {
    const bodyWrapper = create('div', {
      className: styles['menu-body-wrapper'],
    });

    this.boardModel.userBoards?.forEach((board, index) => {
      const boardDiv = create('div', {
        className: styles['board-name'],
        child: board.name,
        dataAttr: [['index', index.toString()]],
      });

      this.deleteBoard = create('button', {
        className: `${styles['board__delete']} ${globalStyles.hidden}`,
        child: 'Delete board',
        dataAttr: [
          ['deleteItem', 'delete-item'],
          ['closeButton', 'close-button'],
        ],
      });

      this.deleteBoard.addEventListener('click', (event: Event) =>
        this.emit('deleteChosenBoard', event)
      );

      const boardNameWrapper = create('div', {
        className: styles['board-name__wrapper'],
        child: [boardDiv, this.deleteBoard],
        parent: bodyWrapper,
        dataAttr: [['boardNameWrapper', 'board-name__wrapper']],
      });

      boardNameWrapper.addEventListener('mouseenter', (event: Event) => {
        this.emit('showDeleteButton', event);
      });

      boardNameWrapper.addEventListener('mouseleave', (event: Event) =>
        this.emit('hideDeleteButton', event)
      );

      // bodyWrapper.appendChild(boardNameWrapper);

      boardDiv.addEventListener('click', (event: Event) =>
        this.emit('renderBoard', event)
      );
    });

    return bodyWrapper;
  }

  showDeleteButton(element: HTMLElement) {
    const deleteButtonWrapper = element.querySelector('[data-delete-item]');

    if (deleteButtonWrapper) {
      deleteButtonWrapper.classList.remove(globalStyles.hidden);
    }
  }

  hideDeleteButton(element: HTMLElement) {
    element!
      .parentElement!.querySelectorAll('[data-delete-item]')
      .forEach((element) => {
        element.classList.add(globalStyles.hidden);
      });
  }

  deleteChosenBoard(element: HTMLElement) {
    element.parentElement!.remove();
  }

  menuAddBoard() {
    this.addBoardText = create('div', {
      className: styles['add-board'],
      child: 'new Board',
    });

    const addBoardBtn = addBtn('add Board');
    const close = closeBtn();
    this.input = inputElement('Enter board name...');
    const buttonWrapper = create('div', {
      className: styles['button-wrapper'],
      child: [addBoardBtn, close],
    });

    this.inputForm = create('form', {
      className: `${styles['input-form']} ${globalStyles['hidden']}`,
      child: [this.input, buttonWrapper],
    });

    const menuBottom = create('div', {
      className: styles['menu-body-wrapper'],
      child: [this.addBoardText, this.inputForm],
    });

    this.addBoardText.addEventListener('click', () =>
      this.emit('showBoardInputForm')
    );

    close.addEventListener('click', () => this.emit('closeBottomBlock'));
    addBoardBtn.addEventListener('click', (event: Event) => {
      event.preventDefault();
      this.emit('addNewBoard');
    });

    return menuBottom;
  }

  closeMenu() {
    this.menuWrapper?.remove();
    this.boardModel.headerBoardsMenuIsOpen = false;
  }

  showBoardInputForm() {
    this.addBoardText?.classList.add(globalStyles['hidden']);
    this.inputForm?.classList.remove(globalStyles['hidden']);
  }

  closeBottomBlock() {
    this.addBoardText?.classList.remove(globalStyles['hidden']);
    this.inputForm?.classList.add(globalStyles['hidden']);
  }

  addNewBoard() {
    if (
      typeof this.boardModel.dataUser!.name === 'object' ||
      this.input!.value === ''
    ) {
      return;
    }
    const obj: {
      name: string;
      userName: string;
      favorite: boolean;
    } = {
      name: this.input!.value,
      userName: this.boardModel.dataUser!.name,
      favorite: false,
    };

    this.boardModel.createNewBoard(obj).then(() => {
      this.boardModel.currentBoardIndex =
        this.boardModel.userBoards!.length - 1;

      this.renderBoard();
    });
    this.closeMenu();
  }

  renderBoard() {
    this.mainElement.innerHTML = '';
    const main = new MainView(this.boardModel, this.mainElement);
    main.show();

    this.closeMenu();
  }
}
