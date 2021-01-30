import CardController from '../card.component/card.controller';
import CardView from '../card.component/card.view';

function renderNewCard(
  boardModel: any,
  cardListBody: Element,
  cardIndex: number,
  listIndex: number
) {
  const card = new CardView(boardModel, cardListBody);

  card.show(cardIndex, listIndex);

  new CardController(boardModel, card);
}

export default renderNewCard;
