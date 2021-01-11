import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import styles from './addListCardBtn.module.css';
import CardListView from '../card.list.component/card.list.view';

export default class AddListCardBtnView extends EventEmitter {
  wrapper: HTMLElement | null;

  form: HTMLElement | null;

  link: HTMLElement | null;

  input: HTMLElement | null;

  addBtnContainer: HTMLElement | null;

  board: HTMLElement;

  constructor(public model: any, public elements: any) {
    super();
    this.wrapper = null;
    this.form = null;
    this.link = null;
    this.input = null;
    this.addBtnContainer = null;
    this.board = elements;
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
      className: `${styles['card-list_wrapper']} ${styles['add-list-btn_wrapper']}`,
      child: null,
    });

    this.form = create('form', {
      className: styles.form,
      child: null,
      parent: this.wrapper,
    });

    this.link = create('a', {
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

    return this.wrapper;
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

    this.addBtnContainer = create('div', {
      className: styles.hidden,
      child: null,
      parent: this.form,
    });

    const addListBtn = create('input', {
      className: styles['add-button'],
      child: null,
      parent: this.addBtnContainer,
      dataAttr: [
        ['type', 'submit'],
        ['value', 'Add List'],
      ],
    });

    const closeBtn = create('div', {
      className: styles['close-input'],
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
    const newList = new CardListView(
      this.model,
      this.board,
      this.model.inputNeListName
    );
    newList.show();
    this.model.changeNewListName('');
    if (this.input) {
      (this.input as HTMLInputElement).value = '';
    }
  }
}
