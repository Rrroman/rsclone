import EventEmitter from '../../utils/eventEmitter';

export default class AddListCardBtnModel extends EventEmitter {
  model: null | {};

  inputNeListName: any | null;

  constructor() {
    super();
    this.model = null;
    this.inputNeListName = null;
  }

  changeNewListName(newName: string) {
    this.inputNeListName = newName;
  }
}
