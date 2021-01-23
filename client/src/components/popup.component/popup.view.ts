import styles from './popup.module.css';
import globalStyles from '../../globals.module.css';
import stylesFromCardList from '../card.list.component/card.list.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import {
  textAreaAutoHeight,
  addBtn,
  closeBtn,
} from '../user.kit.component/user.kit.components';

export default class PopupView extends EventEmitter {
  savedText: string | null;
  popupCardName: string | null;
  popupBody: HTMLElement | null;
  listName: undefined | string | null;
  popupTitle: HTMLElement | null;
  textareaDescription: HTMLElement | null;
  textareaDescriptionText: any;
  savedDescriptionTextElement: HTMLElement | null;
  popupCloseButton: HTMLElement | null;

  constructor(public boardModel: any, public currentCard: HTMLElement) {
    super();
    this.popupTitle = null;
    this.popupCardName = null;
    this.listName = null;
    this.textareaDescription = null;
    this.textareaDescriptionText = 'More detailed description ...';
    this.savedText = null;
    this.savedDescriptionTextElement = null;
    this.popupBody = null;
    this.popupCloseButton = null;
    this.popupCloseButton = null;
  }

  show() {
    this.addCardDataToPopup();
  }

  addCardDataToPopup() {
    this.boardModel.overlayElement.classList.remove(globalStyles.hidden);
    if (
      this.currentCard &&
      this.currentCard.previousSibling!.textContent !== ''
    ) {
      this.savedText = this.currentCard.previousSibling!.textContent;
    }

    this.popupCardName = this.currentCard.textContent;

    const popupWrapper = this.boardModel.overlayElement.firstChild;

    this.popupBody = create('div', {
      className: styles['popup__body'],
    });

    this.listName = (this.currentCard.closest(
      '[data-list-name]'
    ) as HTMLElement).dataset.listName;

    this.popupTitle = create('textarea', {
      className: `${stylesFromCardList['card-name']} ${styles['popup__card-name']}`,
      child: this.popupCardName,
      parent: null,
      dataAttr: [
        ['maxlength', '512'],
        ['spellcheck', 'false'],
        ['draggable', 'false'],
      ],
    });

    this.popupTitle.addEventListener('input', (inputEvent: Event) =>
      this.emit('addPopupNameToCard', inputEvent)
    );

    this.popupTitle.addEventListener('click', (selectEvent: Event) =>
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

    this.textareaDescription.addEventListener('click', (selectEvent: Event) =>
      this.emit('selectText', selectEvent)
    );

    this.textareaDescription.addEventListener('click', (showEvent: Event) =>
      this.emit('showDescriptionButtons', showEvent)
    );

    this.textareaDescription.addEventListener('blur', (blurEvent: Event) =>
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
      (addPreviousText: Event) => {
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

    const sidebarTitle = create('h3', {
      className: styles['sidebar__title'],
      child: 'add to card',
    });

    const labelsButton = create('button', {
      className: styles['popup__sidebar-button'],
      child: 'Labels',
      dataAttr: [['title', 'label']],
    });

    const checklistButton = create('button', {
      className: styles['popup__sidebar-button'],
      child: 'Checklist',
      dataAttr: [['title', 'checklist']],
    });

    const popupSidebar = create('div', {
      className: styles['popup__sidebar'],
      child: [sidebarTitle, labelsButton, checklistButton],
    });

    const popupDescriptionWrapper = create('div', {
      className: styles['popup__description-wrapper'],
      child: [popupDescriptionInner, popupSidebar],
    });

    if (this.textareaDescription && this.savedText) {
      (this.textareaDescription as HTMLTextAreaElement).value = this.savedText;
    }

    this.popupCloseButton = create('div', {
      className: styles['popup__close-button'],
      child: '&times;',
      dataAttr: [['data-close-button', '']],
    });

    this.popupCloseButton.addEventListener('click', () =>
      this.emit('popupClose', event)
    );

    this.popupBody!.append(this.popupTitle);
    this.popupBody!.append(popupListName);
    this.popupBody!.append(popupDescriptionWrapper);
    this.popupBody!.append(this.popupCloseButton);
    popupWrapper.append(this.popupBody);
  }

  popupClose() {
    this.popupBody!.parentElement!.parentElement!.classList.add(
      globalStyles.hidden
    );
    this.popupBody!.innerHTML = '';
  }

  addPopupNameToCard() {
    if (this.currentCard) {
      this.currentCard.textContent = this.boardModel.getPopupCardName();
    }
  }

  addPreviousText(event: Event) {
    const previousText = (event.target as HTMLTextAreaElement).closest(
      '[data-popup-description-buttons]'
    )!.nextSibling!.textContent;

    if (previousText) {
      (this.textareaDescription as HTMLTextAreaElement).value = previousText;
      this.currentCard.previousSibling!.textContent = previousText;
    }
  }

  saveText(text: string) {
    this.currentCard.previousSibling!.textContent = text;
  }

  selectText(event: any) {
    event.target.select();
    return this;
  }

  initialPopupText(event: Event) {
    this.savedDescriptionTextElement!.textContent = (event.target as HTMLTextAreaElement)!.value;
  }

  hideDescriptionButtons(event: any) {
    if (event.target === this.popupCloseButton) {
      return;
    }
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
}
