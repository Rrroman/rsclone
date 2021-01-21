import styles from './card.module.css';
import globalStyles from '../../globals.module.css';
import stylesFromList from '../card.list.component/card.list.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import PopupView from '../popup.component/popup.view';

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
    return this.createCard();
  }

  createCard() {
    this.descriptionTextContainer = create('div', {
      className: globalStyles.hidden,
    });

    const cardDescriptionTextHidden = create('div', {
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

    return this.card;
  }

  addCardDataToPopup(event: Event) {
    if (event.target) {
      const popupView = new PopupView(
        this.boardModel,
        event.target as HTMLElement
      );
      popupView.show();
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
