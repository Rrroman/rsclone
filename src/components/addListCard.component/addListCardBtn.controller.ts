import EventEmitter from '../../utils/eventEmitter';

export default class AddListCardBtnController extends EventEmitter {
  formWrapper: EventEmitter;

  form: HTMLElement | null;

  constructor(public model: unknown, public viewer1: any) {
    super();
    this.formWrapper = viewer1;
    this.form = null;
    // this.formWrapper.on('addListPlusClick', () => this.addListPlusHandler());
  }

  addListPlusHandler() {
    return this.form;
  }
}
