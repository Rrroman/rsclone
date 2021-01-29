import styles from './checklist.module.css';
import globalStyles from '../../globals.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import {
  addBtn,
  closeBtn,
  selectText,
} from '../user.kit.component/user.kit.components';

export default class ChecklistView extends EventEmitter {
  closeButton: HTMLElement | null;
  checklistTitleButtons: HTMLElement | null;
  checkButtons: HTMLElement | null;
  addItem: HTMLElement | null;
  checklistProgressPercentage: HTMLElement | null;
  checklistProgressBarCurrent: HTMLElement | null;
  deleteButtonWrapper: HTMLElement | null;
  deleteCheckbox: HTMLElement | null;
  label: HTMLElement | null;

  constructor(
    public boardModel: any,
    public currentButton: HTMLElement,
    public checklistWrapper: HTMLElement
  ) {
    super();
    this.closeButton = null;
    this.checklistTitleButtons = null;
    this.checkButtons = null;
    this.addItem = null;
    this.checklistProgressPercentage = null;
    this.checklistProgressBarCurrent = null;
    this.deleteButtonWrapper = null;
    this.deleteCheckbox = null;
    this.label = null;
  }

  show() {
    this.addChecklist();
  }

  addChecklist() {
    const header = create('h4', {
      className: styles['checklist__header'],
      child: 'Add Checklist',
      dataAttr: [['data-sidebar-header', 'sidebar-header']],
    });

    const closeButton = closeBtn();
    closeButton.classList.add(styles['checklist__close']);
    closeButton.setAttribute('data-checklist-button', 'checklist-button');

    closeButton.addEventListener('click', (event: Event) =>
      this.emit('closeSidebarPopup', event)
    );

    const title = create('h5', {
      className: styles['checklist__title'],
      child: 'Title',
    });

    const checklist__textarea = create('textarea', {
      className: styles['checklist__textarea-description'],
      dataAttr: [
        ['maxlength', '512'],
        ['spellcheck', 'false'],
        ['draggable', 'false'],
        ['placeholder', 'Checklist'],
        ['data-checklist-textarea', ''],
      ],
    });

    const addButton = addBtn('Add');
    addButton.classList.add(styles['checklist__add']);
    addButton.setAttribute('data-checklist-button', 'checklist-button');

    addButton.addEventListener('click', (event: Event) =>
      this.emit('addCheckbox', event)
    );

    const checklistWrapper = create('div', {
      className: styles['checklist__wrapper'],
      child: [header, closeButton, title, checklist__textarea, addButton],
    });

    this.currentButton.nextElementSibling!.append(checklistWrapper);
  }

  closeSidebarPopup() {
    this.currentButton.nextElementSibling!.classList.add(globalStyles.hidden);
    this.currentButton.nextElementSibling!.innerHTML = '';
  }

  renderChecklistSection(checklistTitle: string) {
    const checklistSectionTitle = create('textarea', {
      className: styles['checklist-section__title'],
      dataAttr: [
        ['maxlength', '512'],
        ['spellcheck', 'false'],
        ['draggable', 'false'],
        ['checklistTitle', `checklist-title`],
      ],
    });

    (checklistSectionTitle as HTMLTextAreaElement).value = checklistTitle;

    const checklistDeleteButton = create('button', {
      className: styles['checklist-section__delete'],
      child: 'Delete',
      dataAttr: [
        ['data-close-button', ''],
        ['closeButton', 'close-button'],
      ],
    });

    checklistDeleteButton.addEventListener('click', (event: Event) =>
      this.emit('deleteChecklist', event)
    );

    const saveButton = addBtn('Save');
    this.closeButton = closeBtn();

    this.checklistTitleButtons = create('div', {
      className: `${styles['checklist__title-buttons']} ${globalStyles.hidden}`,
      child: [saveButton, this.closeButton],
      dataAttr: [['titleButtons', 'title-buttons']],
    });

    const checklistSectionHeader = create('div', {
      className: styles['checklist-section__header'],
      child: [
        `<i class="far fa-check-square"></i>`,
        checklistSectionTitle,
        this.checklistTitleButtons,
        checklistDeleteButton,
      ],
    });

    checklistSectionTitle.addEventListener('click', (event: Event) =>
      selectText(event)
    );

    checklistSectionTitle.addEventListener('click', (event: Event) =>
      this.emit('showDescriptionButtons', event)
    );

    this.checklistProgressPercentage = create('span', {
      className: styles['progress__percentage'],
      child: '0%',
    });

    this.checklistProgressBarCurrent = create('div', {
      className: styles['progress__bar_current'],
    });

    const checklistProgressBar = create('div', {
      className: styles['progress__bar'],
      child: this.checklistProgressBarCurrent,
    });

    const checklistProgress = create('div', {
      className: styles['checklist__progress'],
      child: [this.checklistProgressPercentage, checklistProgressBar],
    });

    this.addItem = create('textarea', {
      className: styles['checklist__add-item'],
      dataAttr: [
        ['maxlength', '512'],
        ['spellcheck', 'false'],
        ['draggable', 'false'],
        ['placeholder', `Add an item`],
        ['addItem', 'add-item'],
      ],
    });

    const checkSaveButton = addBtn('Add');
    const checkCloseButton = closeBtn();

    checkSaveButton.addEventListener('click', (event: Event) =>
      this.emit('addCheckboxItem', event)
    );

    this.checkButtons = create('div', {
      className: `${styles['checklist__title-buttons']} ${globalStyles.hidden}`,
      child: [checkSaveButton, checkCloseButton],
      dataAttr: [['checkButtons', 'check-buttons']],
    });

    this.addItem.addEventListener('blur', (event: Event) =>
      this.emit('addBasicPlaceholderText', event)
    );

    this.addItem.addEventListener('click', (event: Event) =>
      this.emit('showDescriptionButtons', event)
    );

    const checkItemList = create('div', {
      child: [
        checklistSectionHeader,
        checklistProgress,
        this.addItem,
        this.checkButtons,
      ],
      dataAttr: [['checkList', 'check-list']],
    });

    this.checklistWrapper.append(checkItemList);
  }

  deleteChecklist(event: Event) {
    (event.target as HTMLElement).parentElement!.parentElement!.innerHTML = '';
  }

  addBasicPlaceholderText(element: HTMLTextAreaElement) {
    element.setAttribute('data-checkbox-name', `${element.value}`);
    element.value = '';
    element.placeholder = `Add an item`;
  }

  addCheckboxItem(target: HTMLElement) {
    const checkBoxName = (target.parentElement!
      .previousElementSibling as HTMLTextAreaElement)!.dataset.checkboxName;

    const checkBoxNameContainer = create('input', {
      className: styles['custom-checkbox'],
      child: checkBoxName,
      dataAttr: [
        ['type', 'checkbox'],
        ['id', checkBoxName!],
        ['name', checkBoxName!],
        ['value', checkBoxName!],
        ['customCheckbox', 'custom-checkbox'],
      ],
    });

    this.label = create('label', {
      className: styles['checkbox-label'],
      child: checkBoxName!,
      dataAttr: [['for', checkBoxName!]],
    });

    this.deleteCheckbox = create('button', {
      className: `${styles['checkbox__delete']} ${globalStyles.hidden}`,
      child: 'Delete item',
      dataAttr: [
        ['deleteItem', 'delete-item'],
        ['closeButton', 'close-button'],
      ],
    });

    this.deleteCheckbox.addEventListener('click', (event: Event) =>
      this.emit('deleteCurrentCheckbox', event)
    );

    const checkbox = create('div', {
      className: styles['checkbox-wrapper'],
      child: [checkBoxNameContainer, this.label, this.deleteCheckbox],
    });

    checkbox.addEventListener('mouseenter', (event: Event) =>
      this.emit('showDeleteButton', event)
    );

    checkbox.addEventListener('mouseleave', (event: Event) =>
      this.emit('hideDeleteButton', event)
    );

    this.label.addEventListener('click', (event: Event) =>
      this.emit('checkCheckbox', event)
    );

    if (
      target
        .closest('[data-checklist-wrapper]')!
        .querySelector(`[name="${checkBoxName}"]`)
    ) {
      return;
    }

    target.parentElement!.parentElement!.insertBefore(checkbox, this.addItem);
  }

  showDeleteButton(element: HTMLElement) {
    const deleteButtonWrapper = element.querySelector('[data-delete-item]');

    if (deleteButtonWrapper) {
      deleteButtonWrapper.classList.remove(globalStyles.hidden);
    }
  }

  hideDeleteButton(element: HTMLElement) {
    element!
      .parentElement!.querySelectorAll('[data-delete-item]')
      .forEach((element) => {
        element.classList.add(globalStyles.hidden);
      });
  }

  deleteCurrentCheckbox(element: HTMLElement) {
    element.parentElement!.remove();
  }

  checkCheckbox(element: HTMLElement) {
    const checkboxArray = [
      ...element
        .closest('[data-check-list]')!
        .querySelectorAll('[data-custom-checkbox]'),
    ];

    const allItems: number = checkboxArray.length;

    setTimeout(() => {
      const checked: number = checkboxArray.filter(
        (element) => (element as HTMLInputElement).checked
      ).length;

      const percentage = (checked / allItems) * 100;
      this.checklistProgressPercentage!.innerHTML = `${Math.trunc(
        percentage
      )}%`;
      this.checklistProgressBarCurrent!.style.width = `${percentage}%`;
    }, 0);
  }
}
