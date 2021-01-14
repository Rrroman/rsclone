import styles from './card.module.css';
import stylesFromList from '../card.list.component/card.list.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

export default class CardView extends EventEmitter {
  constructor(
    public boardModel: any,
    public elements: any,
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
      parent: this.elements,
      dataAttr: [['draggable', 'true']],
    });
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
}
