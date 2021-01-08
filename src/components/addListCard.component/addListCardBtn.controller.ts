export default class AddListCardBtnController {
  formWrapper: any;

  constructor(public model: unknown, public viewer: any) {
    this.formWrapper = viewer;
    this.formWrapper.on({
      event: 'addListPlusClick',
      listener: () => this.addListPlusHandler(),
    });
  }

  addListPlusHandler() {
    return this;
  }
}
