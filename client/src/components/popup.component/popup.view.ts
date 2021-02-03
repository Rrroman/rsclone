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
import ChecklistView from '../checklist.component/checklist.view';
import ChecklistController from '../checklist.component/checklist.controller';
import { Card } from '../card.component/card.types';

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
  labelsPopup: HTMLElement | null;
  checklistButton: HTMLElement | null;
  sidebarPopup: HTMLElement | null;
  checklistWrapper: HTMLElement | null;

  cardContainer: ParentNode | null;

  cardData: Card | null;

  previousText: null | string;

  constructor(
    public boardModel: any,
    public currentCard: HTMLElement,
    public listIndex: number,
    public cardIndex: number
  ) {
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
    this.labelsPopup = null;
    this.checklistButton = null;
    this.sidebarPopup = null;
    this.checklistWrapper = null;
    this.cardContainer = null;
    this.cardData = null;
    this.previousText = null;
  }

  show() {
    this.addCardDataToPopup();
    this.cardContainer = this.currentCard.parentNode!.parentNode;
  }

  addCardDataToPopup() {
    this.boardModel.overlayElement.classList.remove(globalStyles.hidden);
    // -----------------
    if (
      this.currentCard &&
      this.currentCard.previousSibling!.textContent !== ''
    ) {
      this.savedText = this.currentCard.previousSibling!.textContent;
    }
    // ----------------
    this.cardData = this.boardModel.userBoards[
      this.boardModel.currentBoardIndex
    ].lists[this.listIndex].cards[this.cardIndex];

    this.popupCardName = this.currentCard.textContent;

    this.previousText = this.cardData!.description;

    const popupWrapper = this.boardModel.overlayElement.firstChild;

    this.popupBody = create('div', {
      className: styles['popup__body'],
    });

    // this.listName = (this.currentCard.closest(
    //   '[data-list-name]'
    // ) as HTMLElement).dataset.listName;

    this.listName = this.boardModel.userBoards[
      this.boardModel.currentBoardIndex
    ].lists[this.listIndex].name;

    this.popupTitle = create('textarea', {
      className: `${stylesFromCardList['card-name']} ${styles['popup__card-name']}`,
      child: this.cardData!.name,
      parent: null,
      dataAttr: [
        ['maxlength', '512'],
        ['spellcheck', 'false'],
        ['draggable', 'false'],
      ],
    });

    const popupTitleWrapper = create('div', {
      className: styles['popup__title-wrapper'],
      child: ['<i class="far fa-credit-card"></i>', this.popupTitle],
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

    const popupDescriptionHeaderWrapper = create('div', {
      className: styles['popup__description-header-wrapper'],
      child: [
        `<i class="fas fa-align-left ${styles['description__icon']}"</i>`,
        popupDescriptionHeader,
      ],
    });

    this.textareaDescription = create('textarea', {
      className: styles['popup__textarea-description'],
      child: this.cardData!.description,
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
        popupDescriptionHeaderWrapper,
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

    this.checklistButton = create('button', {
      className: styles['popup__sidebar-button'],
      child: 'Checklist',
      dataAttr: [['title', 'checklist']],
    });

    this.createChecklistButtonWrapper(labelsButton);

    const checklistButtonWrapper = this.createChecklistButtonWrapper(
      this.checklistButton
    );

    const popupSidebar = create('div', {
      className: styles['popup__sidebar'],
      child: [sidebarTitle, checklistButtonWrapper],
      dataAttr: [['data-sidebar-popup', '']],
    });

    popupSidebar.addEventListener('click', (event: Event) =>
      this.emit('openSidebarPopup', event)
    );

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

    this.popupCloseButton.addEventListener('click', (event: Event) =>
      this.emit('popupClose', event)
    );

    this.checklistWrapper = create('div', {
      className: styles['checklist-wrapper'],
      dataAttr: [['checklistWrapper', 'checklist-wrapper']],
    });

    const deleteCard = create('button', {
      className: styles['card__delete'],
      child: 'Delete card',
      dataAttr: [
        ['data-close-button', ''],
        ['closeButton', 'close-button'],
        ['cardDelete', 'card-delete'],
      ],
    });

    deleteCard.addEventListener('click', () => this.emit('deleteCard'));

    this.popupBody!.append(popupTitleWrapper);
    this.popupBody!.append(popupListName);
    this.popupBody!.append(popupDescriptionWrapper);
    this.popupBody!.append(this.popupCloseButton);
    this.popupBody!.append(this.checklistWrapper);
    this.popupBody!.append(this.checklistWrapper);
    this.popupBody!.append(deleteCard);
    popupWrapper.append(this.popupBody);
  }

  deleteCard() {
    this.popupClose();
    this.boardModel
      .removeCardFromDB(this.listIndex, this.cardIndex)
      .then(() => {
        this.boardModel.removeCardFromData(this.listIndex, this.cardIndex);
      })
      .then(() => {
        (this.currentCard.parentNode as HTMLElement).remove();
      })
      .then(() => {
        const length = this.boardModel.userBoards[
          this.boardModel.currentBoardIndex
        ].lists[this.listIndex].cards.length;

        for (let i = this.cardIndex; i < length; i += 1) {
          this.boardModel.updateCardDB(
            this.boardModel.userBoards[this.boardModel.currentBoardIndex].lists[
              this.listIndex
            ].cards[i]._id,
            { order: i }
          );

          this.boardModel.userBoards[this.boardModel.currentBoardIndex].lists[
            this.listIndex
          ].cards[i].order = i;

          (this.cardContainer!.children[
            i
          ] as HTMLElement).dataset.order = i.toString();
        }
      })
      .catch((err: Error) => console.log('can not delete card on server', err));
  }

  popupClose() {
    this.popupBody!.parentElement!.parentElement!.classList.add(
      globalStyles.hidden
    );
    this.popupBody!.remove();
  }

  addPopupNameToCard(input: HTMLInputElement) {
    this.boardModel.updateCardDB(this.cardData!._id, { name: input.value });
    this.boardModel.updateCardModelData(this.listIndex, this.cardIndex, {
      name: input.value,
    });

    if (this.currentCard) {
      this.currentCard.textContent = this.boardModel.getPopupCardName();
    }
  }

  addPreviousText() {
    (this
      .textareaDescription as HTMLTextAreaElement).value = this.previousText!;
  }

  saveText() {
    this.boardModel
      .updateCardDB(this.cardData!._id, {
        description: (this.textareaDescription as HTMLTextAreaElement).value,
      })
      .then(
        () =>
          (this.previousText = (this
            .textareaDescription as HTMLTextAreaElement).value)
      );
    this.boardModel.updateCardModelData(this.listIndex, this.cardIndex, {
      description: (this.textareaDescription as HTMLTextAreaElement).value,
    });
  }

  selectText(event: any) {
    event.target.select();
    return this;
  }

  initialPopupText(event: Event) {
    this.savedDescriptionTextElement!.textContent = (event.target as HTMLTextAreaElement)!.value;
  }

  hideDescriptionButtons(event: any) {
    if (
      event.target === this.popupCloseButton ||
      event.target.dataset.closeButton ||
      event.target.dataset.checklistButton
    ) {
      return;
    }

    const descriptionTextarea = event.target
      .closest('[data-popup]')
      .querySelector('[data-popup-textarea]');

    const popupDescriptionButtons = event.target
      .closest('[data-popup]')
      .querySelector('[data-popup-description-buttons]');

    const popupChecklistTitle = event.target
      .closest('[data-popup]')
      .querySelectorAll('[data-checklist-title]');

    const checklistAddItem = event.target
      .closest('[data-popup]')
      .querySelectorAll('[data-add-item]');

    const popupChecklistTitleButtons = event.target
      .closest('[data-popup]')
      .querySelectorAll('[data-title-buttons]');

    const checkButtons = event.target
      .closest('[data-popup]')
      .querySelectorAll('[data-check-buttons]');

    if (
      event.target !== descriptionTextarea &&
      event.target !== popupChecklistTitle &&
      event.target !== checklistAddItem
    ) {
      popupDescriptionButtons.classList.add(globalStyles.hidden);

      this.hideHelper(
        popupChecklistTitleButtons,
        event.target,
        popupChecklistTitle
      );

      this.hideHelper(checkButtons, event.target, checklistAddItem);
    }
  }

  hideHelper(
    textarea: HTMLElement[],
    eventTarget: HTMLElement,
    buttons: HTMLElement[]
  ) {
    textarea.forEach((checkButton: HTMLElement) => {
      const arrAddItems: HTMLElement[] = Array.from(buttons);
      if (!arrAddItems.includes(eventTarget)) {
        checkButton.classList.add(globalStyles.hidden);
      }
    });
  }

  showDescriptionButtons(event: any) {
    const controlButtons = event.target.nextSibling;
    controlButtons.classList.remove(globalStyles.hidden);
  }

  openSidebarPopup(event: Event) {
    const target = event.target as HTMLElement;
    target.nextElementSibling!.classList.toggle(globalStyles.hidden);
  }

  createChecklistButtonWrapper(buttonElement: HTMLElement) {
    this.sidebarPopup = create('div', {
      className: `${styles['sidebar__popup']} ${globalStyles.hidden}`,
    });

    const labelsWrapper = create('div', {
      className: styles['sidebar__wrapper'],
      child: [buttonElement, this.sidebarPopup],
    });

    return labelsWrapper;
  }

  renderSidebarPopupContent(element: HTMLElement) {
    if (element === this.checklistButton && this.checklistWrapper) {
      const checklistView = new ChecklistView(
        this.boardModel,
        element,
        this.checklistWrapper
      );

      checklistView.show();
      new ChecklistController(this.boardModel, checklistView, this);
    }
  }
}
