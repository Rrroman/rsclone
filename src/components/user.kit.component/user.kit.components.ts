import create from '../../utils/create';
import styles from './addCloseBtn.module.css';

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
  });
}

export { addBtn, closeBtn };
