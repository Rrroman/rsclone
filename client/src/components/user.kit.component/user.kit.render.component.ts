import CardController from '../card.component/card.controller';
import CardView from '../card.component/card.view';

function renderNewCard(
  boardModel: any,
  cardListBody: Element,
  cardIndex: number,
  listIndex: number
) {
  const card = new CardView(boardModel, cardListBody);

  new CardController(boardModel, card);
  return card.show(cardIndex, listIndex);
}

export default renderNewCard;
