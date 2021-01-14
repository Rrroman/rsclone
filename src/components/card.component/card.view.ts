import styles from './card.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

export default class CardView extends EventEmitter {
  constructor(
    public boardModel: any,
    public cardListBody: any,
    public cardHeader?: string
  ) {
    super();
  }

  show() {
    return this.createCard();
  }

  createCard() {
    return create('div', {
      className: styles.card,
      child: this.boardModel.cardName,
      parent: this.cardListBody,
    });
  }

  openOverlay(event: Event) {
    this.boardModel.overlayElement.classList.add(styles.show);
    console.log(event.target);

    this.boardModel.overlayElement.firstChild.classList.add(styles.show);
    // console.log(this.boardModel.overlayElement.firstChild);
    return this;
  }
}
