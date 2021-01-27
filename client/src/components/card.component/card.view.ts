import styles from './card.module.css';
import globalStyles from '../../globals.module.css';
import stylesFromList from '../card.list.component/card.list.module.css';

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

  show() {
    this.createCard();
  }

  createCard() {
    this.descriptionTextContainer = create('div', {
      className: globalStyles.hidden,
    });

    const cardDescriptionTextHidden = create('div', {
      className: styles['card__text'],
      child: this.boardModel.cardName,
    });

    this.card = create('div', {
      className: styles.card,
      child: cardDescriptionTextHidden,
      parent: this.cardListBody,
      dataAttr: [
        ['draggable', 'true'],
        ['data-card', ''],
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
    if (this.boardModel.draggableList) {
      this.boardModel.draggableList.classList.add(stylesFromList['black-back']);
    }
  }

  dragEndElementChange() {
    if (this.boardModel.draggableList) {
      this.boardModel.draggableList.classList.remove(
        stylesFromList['black-back']
      );
    }
  }

  selectText(event: any) {
    event.target.select();
    return this;
  }
}
