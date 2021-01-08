import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import './addListCardBtn.css';

export default class AddListCardBtnView extends EventEmitter {
  wrapper: HTMLElement | null;

  form: HTMLElement | null;

  constructor(public model: unknown, public elements: any) {
    super();
    this.wrapper = null;
    this.form = null;
  }

  show() {
    const formWrapper = this.renderPlusBtn();
    this.renderAddCardInputForm();

    return formWrapper;
  }

  renderPlusBtn() {
    this.wrapper = create('div', {
      className: 'card-list_wrapper add-list-btn_wrapper',
      child: null,
    });

    this.form = create('form', {
      className: 'form',
      child: null,
      parent: this.wrapper,
    });

    const link = create('a', {
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
      parent: link,
    });

    link.addEventListener('click', () => this.emit('addListPlusClick'));

    return this.wrapper;
  }

  renderAddCardInputForm() {
    create('input', {
      className: 'input-new-card',
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

    const addBtnContainer = create('div', {
      className: 'addBtn-container',
      child: null,
      parent: this.form,
    });

    create('input', {
      className: 'add-button',
      child: null,
      parent: addBtnContainer,
      dataAttr: [
        ['type', 'submit'],
        ['value', 'Add List'],
      ],
    });

    create('div', {
      className: 'close-input',
      child: '&times;',
      parent: addBtnContainer,
    });

    return this.wrapper;
  }
}
