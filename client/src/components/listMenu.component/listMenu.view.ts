import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import styles from './listMenu.module.css';
import globalStyles from '../../globals.module.css';
import {
  addBtn,
  closeBtn,
  inputElement,
} from '../user.kit.component/user.kit.components';
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import AddListCardBtnView from '../addListCardBtn.component/addListCardBtn.view';

export default class ListMenu extends EventEmitter {
  menuBody: null | HTMLElement;
  menuElement: null | HTMLElement;
  menuList: null | HTMLElement;
  activeBlock: null | HTMLElement;
  activeElement: null | HTMLElement;
  inputListName: null | HTMLInputElement;
  listsIndexSelect: null | HTMLElement;
  currentList: HTMLElement;

  constructor(
    public boardModel: any,
    public board: HTMLElement,
    public currentListContainer: HTMLElement
  ) {
    super();
    this.menuBody = null;
    this.menuElement = null;
    this.menuList = null;
    this.activeBlock = null;
    this.activeElement = null;
    this.inputListName = null;
    this.listsIndexSelect = null;
    this.currentList = currentListContainer.firstChild as HTMLElement;
  }

  show() {
    this.renderListMenu();
    this.calcCurrentIndex();
  }

  calcCurrentIndex() {
    const listArr = Array.from(this.board.childNodes);
    this.boardModel.currentListIndex = listArr.indexOf(
      this.currentListContainer
    );
  }

  renderListMenu() {
    const closeMenuBtn = create('div', {
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
        closeMenuBtn,
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

    closeMenuBtn.addEventListener('click', (event: Event) => {
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
      child: create('a', {
        className: styles['list-link'],
        child: 'Add card...',
      }),
    });
    const copyListBtn = create('li', {
      child: create('a', {
        className: globalStyles.hidden,
        child: 'Copy List...',
      }),
    });
    const moveListBtn = create('li', {
      child: create('a', {
        className: globalStyles.hidden,
        child: 'Move List...',
      }),
    });
    const deleteListBtn = create('li', {
      child: create('a', {
        className: styles['list-link'],
        child: 'Remove List...',
      }),
    });

    this.menuList = create('ul', {
      child: [addListBtn, copyListBtn, moveListBtn, deleteListBtn],
      parent: this.menuBody,
    });

    addListBtn.addEventListener('click', () => this.emit('addCardEvent'));
    copyListBtn.addEventListener('click', () => this.emit('renderCopyBlock'));
    moveListBtn.addEventListener('click', () => this.emit('renderMoveBlock'));
    deleteListBtn.addEventListener('click', () =>
      this.emit('deleteCurrentList')
    );
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
    this.menuElement?.remove();
  }

  addCardHandler() {
    const addCardBtn = this.currentList.lastChild?.childNodes[0];
    const inputCard = this.currentList.lastChild?.childNodes[1];
    const textarea = this.currentList!.querySelector(
      '[data-element-textarea]'
    )! as HTMLTextAreaElement;

    (inputCard as HTMLElement).classList.add(globalStyles.hidden);
    (addCardBtn as HTMLElement).classList.remove(globalStyles.hidden);
    this.closeMenu();

    textarea.focus();
  }

  renderCopyBlock() {
    if (this.activeBlock) {
      this.activeBlock.remove();
    }

    this.inputListName = inputElement('Enter list title...');
    if (this.inputListName) {
      this.inputListName.value =
        (this.currentList as HTMLInputElement).dataset.listName || '';
      this.boardModel.changeNewListName(this.inputListName.value);
    }

    const addListBtn = addBtn('Create List');

    this.createControlButtons(addListBtn, this.inputListName);

    addListBtn.addEventListener('click', () => this.emit('createListCopy'));
  }

  renderMoveBlock() {
    if (this.activeBlock) {
      this.activeBlock.remove();
    }

    this.listsIndexSelect = create('select', {
      className: styles.select,
      dataAttr: [['size', '1']],
    });
    const label = create('span', {
      className: styles['select-label'],
      child: 'Position',
    });
    const selectBlock = create('div', {
      className: styles['select-block'],
      child: [label, this.listsIndexSelect],
    });

    const { length } = this.board.childNodes;

    for (let i = 0; i < length - 1; i += 1) {
      const optionValue: number = i + 1;
      create('option', {
        child: optionValue.toString(),
        parent: this.listsIndexSelect,
        dataAttr: [['value', optionValue.toString()]],
      });
    }

    const moveBtn = addBtn('Move List');

    this.createControlButtons(moveBtn, selectBlock);

    moveBtn.addEventListener('click', () => this.emit('moveListTo'));
  }

  createControlButtons(createBtn: HTMLElement, element: HTMLElement) {
    const closeBlockBtn = closeBtn();
    const btnContainer = create('div', {
      className: styles['add-list-btn-container'],
      child: [createBtn, closeBlockBtn],
    });

    this.activeBlock = create('div', {
      className: styles['menu-body'],
      child: [element, btnContainer],
      parent: this.menuElement,
    });

    closeBlockBtn.addEventListener('click', (event: Event) =>
      this.emit('closeActiveBlock', event)
    );
  }

  closeActiveBlock() {
    this.activeBlock?.remove();
    this.boardModel.changeNewListName('');
  }

  createListCopy(insertBeforeElement: null | HTMLElement) {
    if (this.inputListName) {
      this.boardModel.changeNewListName(this.inputListName?.value);
    } else {
      this.boardModel.changeNewListName(this.currentList.dataset.listName);
    }

    const listCopy = new AddListCardBtnView(this.boardModel, this.board);
    listCopy.renderNewList(insertBeforeElement);

    if (listCopy.newList) {
      const { length } = this.currentList.children[1].childNodes;
      for (let i = 0; i < length; i += 1) {
        this.boardModel.cardName = this.currentList.children[1].children[
          i
        ].innerHTML;
      }
    }

    this.closeMenu();
  }

  moveListTo() {
    const newIndex: number =
      +(this.listsIndexSelect as HTMLSelectElement).value - 1;

    if (newIndex === this.boardModel.currentListIndex) {
      this.closeMenu();
      return;
    }

    this.deleteCurrentList();

    if (newIndex < this.boardModel.currentListIndex) {
      this.createListCopy(this.board.children[newIndex] as HTMLElement);
    }

    if (newIndex > this.boardModel.currentListIndex) {
      this.createListCopy(this.board.children[newIndex + 1] as HTMLElement);
    }

    this.closeMenu();
  }

  deleteCurrentList() {
    this.board.children[this.boardModel.currentListIndex].remove();
    const length: number = this.board.childNodes.length - 1;

    this.boardModel
      .removeListFromDB()
      .then(() => {
        this.boardModel.deleteAllCardById(
          this.boardModel.userBoards[this.boardModel.currentBoardIndex].lists[
            this.boardModel.currentListIndex
          ]._id
        );
      })
      .then(() => {
        this.boardModel.removeListFromData();
      })
      .then(() => {
        for (let i = this.boardModel.currentListIndex; i < length; i += 1) {
          this.boardModel.updateListsDB({ order: i });

          this.boardModel.userBoards[this.boardModel.currentBoardIndex].lists[
            i
          ].order = i;

          (this.board.children[i]
            .firstChild as HTMLElement).dataset.order = i.toString();
        }
      })
      .catch((err: Error) => console.log(err));

    this.closeMenu();
  }
}
