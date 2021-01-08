export default class AddListCardBtnController {
  formWrapper: any;

  form: HTMLElement | null;

  constructor(public model: unknown, public viewer1: any) {
    this.formWrapper = viewer1;
    this.form = null;
    this.formWrapper.on('addListPlusClick', () => this.addListPlusHandler());
  }

  addListPlusHandler() {
    return this.form;
  }
}
