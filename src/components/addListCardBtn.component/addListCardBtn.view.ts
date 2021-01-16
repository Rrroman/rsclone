import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import styles from './addListCardBtn.module.css';
import CardListController from '../card.list.component/card.list.controller';
import { addBtn, closeBtn } from '../user.kit.component/user.kit.components';
import CardListView from '../card.list.component/card.list.view';

export default class AddListCardBtnView extends EventEmitter {
  wrapper: HTMLElement | null;

  form: HTMLElement | null;

  link: HTMLElement | null;

  input: HTMLElement | null;

  addBtnContainer: HTMLElement | null;

  newList: HTMLElement | null;

  constructor(public boardModel: any, public board: HTMLElement) {
    super();
    this.wrapper = null;
    this.form = null;
    this.link = null;
    this.input = null;
    this.addBtnContainer = null;
    this.newList = null;
  }

  show() {
    this.renderPlusBtn();
    this.renderAddCardInputForm();
    return this.wrapper;
  }

  renderPlusBtn() {
    if (this.addBtnContainer) {
      this.addBtnContainer.classList.add('hidden');
    }
    this.wrapper = create('div', {
      className: `${styles['card-list_wrapper']} ${styles['add-list-btn_wrapper']}`,
      child: null,
    });

    this.form = create('form', {
      className: styles.form,
      child: null,
      parent: this.wrapper,
    });

    this.link = create('div', {
      className: styles['open-add-list'],
      child: null,
      parent: this.form,
    });

    create('span', {
      className: styles['span-placeholder'],
      child: [
        create('span', { className: styles.plus, child: '+' }),
        create('span', {
          className: styles['span-text'],
          child: 'Add another list',
        }),
      ],
      parent: this.link,
    });

    this.link.addEventListener('click', () => this.emit('addListPlusClick'));
  }

  renderAddCardInputForm() {
    this.input = create('input', {
      className: `${styles['input-new-card']} ${styles.hidden}`,
      child: null,
      parent: this.form,
      dataAttr: [
        ['type', 'text'],
        ['name', 'name'],
        ['placeholder', 'Enter list title...'],
        ['autocomplete', 'off'],
        ['maxlength', '512'],
      ],
    });

    const addListBtn = addBtn('Add List');
    const closeListBtn = closeBtn();

    this.addBtnContainer = create('div', {
      className: styles.hidden,
      child: [addListBtn, closeListBtn],
      parent: this.form,
    });

    this.input.addEventListener('input', (event) =>
      this.emit('inputListName', event)
    );

    closeListBtn.addEventListener('click', () => this.emit('closeBtnClick'));

    addListBtn.addEventListener('click', (event) =>
      this.emit('addListBtnCLick', event)
    );
    return this.wrapper;
  }

  showInputForm() {
    if (this.link && this.addBtnContainer && this.input) {
      this.link.classList.add(styles.hidden);
      this.addBtnContainer.classList.remove(styles.hidden);
      this.addBtnContainer.classList.add(styles['addBtn-container']);
      this.input.classList.remove(styles.hidden);
      this.input.focus();
    }
  }

  closeInputForm() {
    if (this.link && this.addBtnContainer && this.input) {
      this.link.classList.remove(styles.hidden);
      this.addBtnContainer.classList.add(styles.hidden);
      this.addBtnContainer.classList.remove(styles['addBtn-container']);
      this.input.classList.add(styles.hidden);
    }
  }

  renderNewList() {
    if (!this.boardModel.inputNeListName) {
      return;
    }
    const list = new CardListView(this.boardModel, this.board);
    this.newList = list.show();

    this.boardModel.changeNewListName('');
    if (this.input) {
      (this.input as HTMLInputElement).value = '';
    }

    // eslint-disable-next-line no-new
    new CardListController(this.boardModel, list);

    this.newList.addEventListener('dragstart', (event: DragEvent) => {
      if (event.target && (event.target as HTMLElement).dataset.list)
        list.emit('dragstart', event.target);
    });

    this.newList.addEventListener('dragend', () => {
      list.emit('dragend');
    });
  }
}
