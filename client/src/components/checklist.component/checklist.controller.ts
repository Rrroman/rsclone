export default class ChecklistController {
  checklistView: any;

  constructor(
    public boardModel: { [key: string]: any },
    public view: any,
    public popupView: any
  ) {
    this.checklistView = view;
    this.checklistView
      .on({
        event: 'closeSidebarPopup',
        listener: (event: Event) => this.closeSidebarPopup(event),
      })
      .on({
        event: 'addCheckbox',
        listener: (event: Event) => this.addCheckbox(event),
      })
      .on({
        event: 'deleteChecklist',
        listener: (event: Event) => this.deleteChecklist(event),
      })
      .on({
        event: 'showDescriptionButtons',
        listener: (event: Event) => this.showDescriptionButtons(event),
      })
      .on({
        event: 'addBasicPlaceholderText',
        listener: (event: Event) => this.addBasicPlaceholderText(event),
      })
      .on({
        event: 'addCheckboxItem',
        listener: (event: Event) => this.addCheckboxItem(event),
      })
      .on({
        event: 'showDeleteButton',
        listener: (event: Event) => this.showDeleteButton(event),
      })
      .on({
        event: 'hideDeleteButton',
        listener: (event: Event) => this.hideDeleteButton(event),
      })
      .on({
        event: 'deleteCurrentCheckbox',
        listener: (event: Event) => this.deleteCurrentCheckbox(event),
      })
      .on({
        event: 'checkCheckbox',
        listener: (event: Event) => this.checkCheckbox(event),
      });
  }

  checkCheckbox(event: Event) {
    this.checklistView.checkCheckbox(event.target);
  }

  deleteCurrentCheckbox(event: Event) {
    this.checklistView.deleteCurrentCheckbox(event.target);
  }

  hideDeleteButton(event: Event) {
    this.checklistView.hideDeleteButton(event.target);
  }

  showDeleteButton(event: Event) {
    this.checklistView.showDeleteButton(event.target);
  }

  addCheckboxItem(event: Event) {
    this.checklistView.addCheckboxItem(event.target);
  }

  addBasicPlaceholderText(event: Event) {
    this.checklistView.addBasicPlaceholderText(event.target);
  }

  showDescriptionButtons(event: Event) {
    this.popupView.showDescriptionButtons(event);
  }

  deleteChecklist(event: Event) {
    this.checklistView.deleteChecklist(event);
  }

  addCheckbox(event: Event) {
    const textarea = (event.target as HTMLElement)!.previousElementSibling;
    const checklistCheckboxTitle = (textarea as HTMLTextAreaElement)!.value;

    this.checklistView.renderChecklistSection(checklistCheckboxTitle);
    this.closeSidebarPopup(event);
  }

  closeSidebarPopup(event: Event) {
    this.checklistView.closeSidebarPopup(event.target);
  }
}
