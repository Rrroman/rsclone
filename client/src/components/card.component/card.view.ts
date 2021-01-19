import styles from './card.module.css';
import globalStyles from '../../globals.module.css';
import stylesFromList from '../card.list.component/card.list.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import { textAreaAutoHeight } from '../user.kit.component/user.kit.components';

export default class CardView extends EventEmitter {
  popupTitle: HTMLElement | null;

  popupCardName: HTMLElement | null;

  card: HTMLElement | null;

  clickedCard: HTMLElement | null;

  listName: string | HTMLElement | null;

  descriptionTextContainer: HTMLElement | null;

  textareaDescription: HTMLElement | null;

  textareaDescriptionText: any;

  savedText: string;

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
    this.descriptionTextContainer = null;
    this.textareaDescription = null;
    this.textareaDescriptionText = 'More detailed description ...';
    this.savedText = '';
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
        ['card', 'card'],
      ],
    });
    this.card.prepend(this.descriptionTextContainer);

    return this.card;
  }

  openOverlay(event: any) {
    this.boardModel.overlayElement.classList.remove(globalStyles.hidden);
    if (event.target.previousSibling.textContent !== '') {
      this.savedText = event.target.previousSibling.textContent;
    }
  }

  addCardDataToPopup(event: any) {
    const { target } = event;
    this.clickedCard = target;
    this.popupCardName = target.textContent;

    const popupBody = this.boardModel.overlayElement.firstChild;

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

    this.popupTitle.addEventListener('click', (selectEvent) =>
      this.emit('selectText', selectEvent)
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
      child: 'Description',
    });

    this.textareaDescription = create('textarea', {
      className: styles['popup__textarea-description'],
      parent: null,
      dataAttr: [
        ['maxlength', '512'],
        ['spellcheck', 'false'],
        ['draggable', 'false'],
        ['placeholder', `${this.textareaDescriptionText}`],
      ],
    });

    this.textareaDescription.addEventListener('click', (selectEvent) =>
      this.emit('selectText', selectEvent)
    );

    this.textareaDescription.addEventListener('blur', (blurEvent) =>
      this.emit('saveText', blurEvent)
    );

    this.textareaDescription.addEventListener('input', () =>
      textAreaAutoHeight(this.textareaDescription!)
    );

    const popupDescriptionWrapper = create('div', {
      className: styles['popup__description-wrapper'],
      child: [popupDescriptionHeader, this.textareaDescription],
    });

    if (this.textareaDescription) {
      (this.textareaDescription as HTMLTextAreaElement)!.value = this.savedText;
    }

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

  selectText(event: any) {
    event.target.select();
    return this;
  }

  saveText(text: string) {
    this.descriptionTextContainer!.textContent = text;
  }
}
