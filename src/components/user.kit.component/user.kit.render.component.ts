import CardController from '../card.component/card.controller';
import CardView from '../card.component/card.view';

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

export default renderNewCard;
