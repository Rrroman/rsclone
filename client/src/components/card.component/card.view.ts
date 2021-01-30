import styles from './card.module.css';
import globalStyles from '../../globals.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import PopupView from '../popup.component/popup.view';
import PopupController from '../popup.component/popup.controller';

export default class CardView extends EventEmitter {
  card: HTMLElement | null;

  clickedCard: HTMLElement | null;

  descriptionTextContainer: HTMLElement | null;

  constructor(
    public boardModel: any,
    public cardListBody: any,
    public cardHeader?: string
  ) {
    super();
    this.card = null;
    this.clickedCard = null;
    this.descriptionTextContainer = null;
  }

  show(cardIndex: number, listIndex: number) {
    this.createCard(cardIndex, listIndex);
  }

  createCard(cardIndex: number, listIndex: number) {
    this.descriptionTextContainer = create('div', {
      className: globalStyles.hidden,
    });

    const currentCard = this.boardModel.userBoards[
      this.boardModel.currentBoardIndex
    ].lists[listIndex!].cards[cardIndex];

    const cardDescriptionTextHidden = create('div', {
      className: styles['card__text'],
      child: currentCard.name,
    });

    this.card = create('div', {
      className: styles.card,
      child: cardDescriptionTextHidden,
      parent: this.cardListBody,
      dataAttr: [
        ['draggable', 'true'],
        ['data-card', ''],
        ['order', currentCard.order],
      ],
    });
    this.card.prepend(this.descriptionTextContainer);

    this.card.addEventListener('click', (event: Event) =>
      this.emit('addCardDataToPopup', event)
    );
    this.card.addEventListener('dragstart', (event: Event) => {
      event.stopPropagation();
      this.emit('cardDragstart', event.target);
    });
    this.card.addEventListener('dragend', (event: Event) => {
      event.stopPropagation();
      this.emit('cardDragend');
    });
  }

  addCardDataToPopup(event: Event) {
    this.boardModel.currentCard = this.card?.dataset.order;
    if (event.target) {
      const popupView = new PopupView(
        this.boardModel,
        event.target as HTMLElement
      );
      popupView.show();
      new PopupController(this.boardModel, popupView);
    }
  }

  dragStartElementChange() {
    this.boardModel.dragElementName = 'card';
    this.boardModel.currentListIndex = this.cardListBody.parentNode.dataset.order;
    this.boardModel.currentCardIndex = Number(this.card?.dataset.order);
    this.card?.classList.add(globalStyles['black-back']);
  }

  dragEndElementChange() {
    this.card?.classList.remove(globalStyles['black-back']);
  }

  selectText(event: any) {
    event.target.select();
    return this;
  }
}
