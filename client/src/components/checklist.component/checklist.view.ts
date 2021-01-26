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
  constructor(
    public boardModel: any,
    public currentButton: HTMLElement,
    public checklistWrapper: HTMLElement
  ) {
    super();
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
        ['checklistTitle', `${checklistTitle}`],
      ],
    });

    (checklistSectionTitle as HTMLTextAreaElement).value = checklistTitle;

    const checklistDeleteButton = create('button', {
      className: styles['checklist-section__delete'],
      child: 'Delete',
      dataAttr: [
        ['data-close-button', ''],
        ['checklistButton', 'checklist-button'],
      ],
    });

    checklistDeleteButton.addEventListener('click', (event: Event) =>
      this.emit('deleteChecklist', event)
    );

    const saveButton = addBtn('Save');
    const closeButton = closeBtn();

    const checklistSectionHeader = create('div', {
      className: styles['checklist-section__header'],
      child: [
        checklistSectionTitle,
        saveButton,
        checklistDeleteButton,
        closeButton,
      ],
    });

    checklistSectionTitle.addEventListener('click', (event: Event) =>
      selectText(event)
    );

    this.checklistWrapper.append(checklistSectionHeader);
  }

  deleteChecklist(event: Event) {
    (event.target as HTMLElement).parentElement!.innerHTML = '';
  }
}
