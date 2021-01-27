export default class AddListCardBtnController {
  addListCardBtn: any;

  constructor(
    public boardModel: { [key: string]: any },

    public viewer: any
  ) {
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
        listener: (event: Event) => this.addNewList(event),
      })
      .on({
        event: 'inputListName',
        listener: (event: { [key: string]: string }) =>
          this.inputNewListName(event),
      });
  }

  addListPlusHandler() {
    this.addListCardBtn.showInputForm();
  }

  closeBtnHandle() {
    this.addListCardBtn.closeInputForm();
  }

  addNewList(event: Event) {
    event.preventDefault();
    this.addListCardBtn.renderNewList(null);
    this.addListCardBtn.closeInputForm();
  }

  inputNewListName(event: { [key: string]: any }) {
    this.boardModel.changeNewListName(event.target.value);
  }
}
