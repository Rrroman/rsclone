import create from '../../utils/create';
import CardController from '../card.component/card.controller';
import CardView from '../card.component/card.view';
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

function inputElement() {
  return create('input', {
    className: `${styles['input-new-card']}`,
    child: null,
    parent: null,
    dataAttr: [
      ['type', 'text'],
      ['name', 'name'],
      ['placeholder', 'Enter list title...'],
      ['autocomplete', 'off'],
      ['maxlength', '512'],
    ],
  }) as HTMLInputElement;
}

function renderNewCard(boardModel: any, cardListBody: Element) {
  const card = new CardView(boardModel, cardListBody);

  const newCard = card.show();

  // eslint-disable-next-line no-new
  new CardController(boardModel, card);

  newCard.addEventListener('click', (event: Event) =>
    card.emit('cardClick', event)
  );
  newCard.addEventListener('click', (event: Event) =>
    card.emit('addCardNameToPopup', event)
  );
  newCard.addEventListener('dragstart', (event: Event) => {
    event.stopPropagation();
    card.emit('cardDragstart', event.target);
  });
  newCard.addEventListener('dragend', (event: Event) => {
    event.stopPropagation();
    card.emit('cardDragend');
  });
}

// function renderList(boardModel: any, board: HTMLElement) {
//   if (!boardModel.inputNewListName) {
//     return;
//   }
//   const list = new CardListView(boardModel, board);
//   const newList = list.show();

//   boardModel.changeNewListName('');

//   // input.value = '';

//   // eslint-disable-next-line no-new
//   new CardListController(boardModel, list);

//   newList.addEventListener('dragstart', (event: DragEvent) => {
//     if (event.target && (event.target as HTMLElement).dataset.list)
//       list.emit('dragstart', event.target);
//   });

//   newList.addEventListener('dragend', () => {
//     list.emit('dragend');
//   });
// }

export { addBtn, closeBtn, inputElement, renderNewCard };
