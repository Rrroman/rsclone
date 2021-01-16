import styles from './card.module.css';
import globalStyles from '../../globals.module.css';
import stylesFromList from '../card.list.component/card.list.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

export default class CardView extends EventEmitter {
  popupTitle: HTMLElement | null;

  popupCardName: HTMLElement | null;

  card: HTMLElement | null;

  clickedCard: HTMLElement | null;

  listName: string | HTMLElement | null;

  constructor(
    public boardModel: any,
    public cardListBody: any,
    public cardHeader?: string
  ) {
    super();
    this.popupTitle = null;
    this.popupCardName = null;
    this.card = null;
    this.clickedCard = null;
    this.listName = null;
  }

  show() {
    return this.createCard();
  }

  createCard() {
    this.card = create('div', {
      className: styles.card,
      child: this.boardModel.cardName,
      parent: this.cardListBody,
      dataAttr: [['draggable', 'true']],
    });

    return this.card;
  }

  openOverlay() {
    this.boardModel.overlayElement.classList.remove(globalStyles.hidden);
    return this;
  }

  addCardNameToPopup(event: any) {
    const { target } = event;
    this.clickedCard = target;
    this.popupCardName = target.textContent;

    const popupBody = this.boardModel.overlayElement.firstChild;

    // this.listName = this.card!.parentElement?.parentElement?.firstChild?.textContent!;
    this.listName = target.closest('[data-list-name]').dataset.listName;

    this.popupTitle = create('textarea', {
      className: `${stylesFromList['card-name']} ${styles['popup__card-name']}`,
      child: this.popupCardName,
      parent: null,
      dataAttr: [
        ['maxlength', '512'],
        ['spellcheck', 'false'],
        ['draggable', 'false'],
      ],
    });

    this.popupTitle.addEventListener('input', (inputEvent) =>
      this.emit('addPopupNameToCard', inputEvent)
    );

    const spanListName: HTMLSpanElement = create('span', {
      className: styles['popup__list-name'],
      child: this.listName,
    });

    const popupListName = create('div', {
      className: styles['popup__list-text'],
      child: 'In list ',
    });
    popupListName.append(spanListName);

    const popupDescriptionHeader = create('h3', {
      className: styles.popup__description,
      child: 'Description wrapper',
    });

    const fakeDescription = create('a', {
      className: styles['popup__fake-description'],
      child: 'More detailed description ...',
      dataAttr: [['href', '#']],
    });

    const popupDescriptionWrapper = create('div', {
      className: styles['popup__description-wrapper'],
      child: [popupDescriptionHeader, fakeDescription],
    });

    popupDescriptionWrapper.addEventListener('click', () =>
      this.emit('editPopupDescription')
    );

    popupBody.append(this.popupTitle);
    popupBody.append(popupListName);
    popupBody.append(popupDescriptionWrapper);
  }

  addPopupNameToCard() {
    if (this.clickedCard) {
      this.clickedCard.textContent = this.boardModel.getPopupCardName();
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
}
