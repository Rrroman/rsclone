import styles from './card.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

export default class CardView extends EventEmitter {
  constructor(
    public model: any,
    public elements: any,
    public cardHeader?: string
  ) {
    super();
  }

  show() {
    this.createCard();
  }

  createCard() {
    create('div', {
      className: styles.card,
      child: this.model.cardName,
      parent: this.elements,
    });
  }
}
