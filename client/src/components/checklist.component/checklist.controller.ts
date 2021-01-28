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
