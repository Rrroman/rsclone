import CardController from '../card.component/card.controller';
import CardView from '../card.component/card.view';

function renderNewCard(boardModel: any, cardListBody: Element) {
  const card = new CardView(boardModel, cardListBody);

  card.show();

  new CardController(boardModel, card);
}

export default renderNewCard;
