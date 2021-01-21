import styles from './card.module.css';
import globalStyles from '../../globals.module.css';
import stylesFromList from '../card.list.component/card.list.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import {
  textAreaAutoHeight,
  addBtn,
  closeBtn,
} from '../user.kit.component/user.kit.components';

export default class CardView extends EventEmitter {
  popupTitle: HTMLElement | null;

  popupCardName: HTMLElement | null;

  card: HTMLElement | null;

  clickedCard: HTMLElement | null;

  listName: string | HTMLElement | null;

  descriptionTextContainer: HTMLElement | null;

  textareaDescription: HTMLElement | null;

  savedDescriptionTextElement: HTMLElement | null;

  popupBody: HTMLElement | null;

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
    this.savedDescriptionTextElement = null;
    this.popupBody = null;
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

    this.popupBody = this.boardModel.overlayElement.firstChild;

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
      dataAttr: [
        ['maxlength', '512'],
        ['spellcheck', 'false'],
        ['draggable', 'false'],
        ['placeholder', `${this.textareaDescriptionText}`],
        ['data-popup-textarea', ''],
      ],
    });

    this.textareaDescription.addEventListener('click', (selectEvent) =>
      this.emit('selectText', selectEvent)
    );

    this.textareaDescription.addEventListener('click', (showEvent) =>
      this.emit('showDescriptionButtons', showEvent)
    );

    this.textareaDescription.addEventListener('blur', (blurEvent) =>
      this.emit('saveText', blurEvent)
    );

    this.textareaDescription.addEventListener('input', () =>
      textAreaAutoHeight(this.textareaDescription!)
    );

    const popupDescriptionCloseButton = closeBtn();

    const popupDescriptionButtons = create('div', {
      className: `${styles.popup__buttons} ${globalStyles.hidden}`,
      child: [addBtn('Save'), popupDescriptionCloseButton],
      dataAttr: [['data-popup-description-buttons', '']],
    });

    this.popupBody!.addEventListener('click', (hideEvent: Event) =>
      this.emit('hideDescriptionButtons', hideEvent)
    );

    popupDescriptionCloseButton.addEventListener(
      'click',
      (addPreviousText: any) => {
        this.emit('addPreviousText', addPreviousText);
      }
    );

    this.savedDescriptionTextElement = create('div', {
      className: globalStyles.hidden,
      dataAttr: [['data-save-description-text', '']],
    });

    const popupDescriptionInner = create('div', {
      className: styles['popup__description-inner'],
      child: [
        popupDescriptionHeader,
        this.textareaDescription,
        popupDescriptionButtons,
        this.savedDescriptionTextElement,
      ],
    });

    const popupSidebar = create('div', {
      className: styles['popup__sidebar'],
      child: 'Sidebar',
    });

    const popupDescriptionWrapper = create('div', {
      className: styles['popup__description-wrapper'],
      child: [popupDescriptionInner, popupSidebar],
    });

    if (this.textareaDescription) {
      (this.textareaDescription as HTMLTextAreaElement)!.value = this.savedText;
    }

    const popupCloseButton = closeBtn();
    popupCloseButton.classList.add(styles['popup__close-button']);

    popupCloseButton.addEventListener('click', () =>
      this.emit('popupClose', event)
    );

    this.popupBody!.prepend(popupCloseButton);
    this.popupBody!.append(this.popupTitle);
    this.popupBody!.append(popupListName);
    this.popupBody!.append(popupDescriptionWrapper);
  }

  popupClose() {
    this.popupBody!.parentElement!.classList.add(globalStyles.hidden);
    this.popupBody!.innerHTML = '';
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

  addPreviousText(event: Event) {
    const previousText = (event.target as HTMLTextAreaElement).closest(
      '[data-popup-description-buttons]'
    )!.nextSibling!.textContent;

    if (previousText) {
      (this.textareaDescription as HTMLTextAreaElement).value = previousText;
      this.descriptionTextContainer!.firstChild!.textContent = previousText;
    }
  }

  saveText(text: string) {
    this.descriptionTextContainer!.textContent = text;
  }

  hideDescriptionButtons(event: any) {
    const popupDescriptionButtons = event.target
      .closest('[data-popup]')
      .querySelector('[data-popup-description-buttons]');
    const descriptionTextarea = event.target
      .closest('[data-popup]')
      .querySelector('[data-popup-textarea]');

    if (event.target !== descriptionTextarea) {
      popupDescriptionButtons.classList.add(globalStyles.hidden);
    }
  }

  showDescriptionButtons(event: any) {
    const controlButtons = event.target.nextSibling;
    controlButtons.classList.remove(globalStyles.hidden);
  }

  initialPopupText(event: Event) {
    this.savedDescriptionTextElement!.textContent = (event.target as HTMLTextAreaElement)!.value;
  }
}
