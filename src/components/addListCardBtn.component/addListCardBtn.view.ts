import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import './addListCardBtn.css';
import CardListView from '../card.list.component/card.list.view';
import CardListController from '../card.list.component/card.list.controller';

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
    const formWrapper = this.renderPlusBtn();
    this.renderAddCardInputForm();

    return formWrapper;
  }

  renderPlusBtn() {
    if (this.addBtnContainer) {
      this.addBtnContainer.classList.add('hidden');
    }
    this.wrapper = create('div', {
      className: 'card-list_wrapper add-list-btn_wrapper',
      child: null,
    });

    this.form = create('form', {
      className: 'form',
      child: null,
      parent: this.wrapper,
    });

    this.link = create('div', {
      className: 'open-add-list',
      child: null,
      parent: this.form,
    });

    create('span', {
      className: 'span-placeholder',
      child: [
        create('span', { className: 'plus', child: '+' }),
        create('span', { className: 'span-text', child: 'Add another list' }),
      ],
      parent: this.link,
    });

    this.link.addEventListener('click', () => this.emit('addListPlusClick'));

    return this.wrapper;
  }

  renderAddCardInputForm() {
    this.input = create('input', {
      className: 'input-new-card hidden',
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

    this.addBtnContainer = create('div', {
      className: 'hidden',
      child: null,
      parent: this.form,
    });

    const addListBtn = create('input', {
      className: 'add-button',
      child: null,
      parent: this.addBtnContainer,
      dataAttr: [
        ['type', 'submit'],
        ['value', 'Add List'],
      ],
    });

    const closeBtn = create('div', {
      className: 'close-input',
      child: '&times;',
      parent: this.addBtnContainer,
    });
    this.input.addEventListener('input', (e) => this.emit('inputListName', e));

    closeBtn.addEventListener('click', () => this.emit('closeBtnClick'));
    addListBtn.addEventListener('click', (e) =>
      this.emit('addListBtnCLick', e)
    );
    return this.wrapper;
  }

  showInputForm() {
    if (this.link && this.addBtnContainer && this.input) {
      this.link.classList.add('hidden');
      this.addBtnContainer.classList.remove('hidden');
      this.addBtnContainer.classList.add('addBtn-container');
      this.input.classList.remove('hidden');
      this.input.focus();
    }
  }

  closeInputForm() {
    if (this.link && this.addBtnContainer && this.input) {
      this.link.classList.remove('hidden');
      this.addBtnContainer.classList.add('hidden');
      this.addBtnContainer.classList.remove('addBtn-container');
      this.input.classList.add('hidden');
    }
  }

  renderNewList() {
    if (!this.boardModel.inputNeListName) {
      return;
    }
    const list = new CardListView(this.boardModel, this.board);
    this.newList = list.show();

    this.boardModel.listArr.push(this.newList);
    this.boardModel.changeNewListName('');
    if (this.input) {
      (this.input as HTMLInputElement).value = '';
    }

    // eslint-disable-next-line no-new
    new CardListController(this.boardModel, list);
    this.newList.addEventListener('dragstart', (e: Event) => {
      list.emit('dragstart', e.target);
    });
    this.newList.addEventListener('dragend', () => {
      list.emit('dragend');
    });
    this.board.addEventListener('dragover', () => {
      list.emit('dragover');
    });
  }
}
