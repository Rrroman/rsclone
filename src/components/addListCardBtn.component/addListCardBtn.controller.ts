export default class AddListCardBtnController {
  addListCardBtn: any;

  constructor(public model: { [key: string]: any }, public viewer: any) {
    this.addListCardBtn = viewer;
    this.addListCardBtn
      .on({
        event: 'addListPlusClick',
        listener: () => this.addListPlusHandler(),
      })
      .on({
        event: 'closeBtnClick',
        listener: () => this.closeBtnHandle(),
      })
      .on({
        event: 'addListBtnCLick',
        listener: (event: Event) => this.addNewCard(event),
      })
      .on({
        event: 'inputListName',
        listener: (event: { [key: string]: string }) => this.inputNewListName(event),
      });
  }

  addListPlusHandler() {
    this.addListCardBtn.showInputForm();
  }

  closeBtnHandle() {
    this.addListCardBtn.closeInputForm();
  }

  addNewCard(event: Event) {
    event.preventDefault();
    this.addListCardBtn.renderNewList();
  }

  inputNewListName(event: { [key: string]: any }) {
    this.model.changeNewListName(event.target.value);
  }
}
