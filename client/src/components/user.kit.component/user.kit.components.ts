import create from '../../utils/create';
import styles from './addCloseBtn.module.css';

function renderTextArea(textAreaText: string) {
  const textarea = create('textarea', {
    className: styles['element-textarea'],
    child: null,
    parent: null,
    dataAttr: [
      ['dir', 'auto'],
      ['placeholder', textAreaText],
    ],
  });
  return textarea;
}

function addBtn(btnText: string) {
  const btn = create('input', {
    className: styles['add-button'],
    child: null,
    parent: null,
    dataAttr: [
      ['type', 'submit'],
      ['value', btnText],
    ],
  });

  return btn;
}

function closeBtn() {
  return create('div', {
    className: styles['close-input'],
    child: '&times;',
    dataAttr: [['data-close-button', '']],
  });
}

function inputElement(text: string) {
  return create('input', {
    className: `${styles['input-new-card']}`,
    child: null,
    parent: null,
    dataAttr: [
      ['type', 'text'],
      ['name', 'name'],
      ['placeholder', text],
      ['autocomplete', 'off'],
      ['maxlength', '512'],
    ],
  }) as HTMLInputElement;
}

function textAreaAutoHeight(element: HTMLElement) {
  const myElement = element;
  myElement.style.height = 'auto';
  myElement.style.overflow = 'hidden';
  myElement.style.height = `${element.scrollHeight}px`;
}

function selectText(event: Event) {
  (event.target as HTMLTextAreaElement).select();
}

export {
  addBtn,
  closeBtn,
  renderTextArea,
  inputElement,
  textAreaAutoHeight,
  selectText,
};
