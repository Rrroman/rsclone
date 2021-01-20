import EventEmitter from '../../utils/eventEmitter';

export default class AddListCardBtnModel extends EventEmitter {
  model: null | {};

  inputNewListName: any | null;

  cardName: string | null;

  constructor() {
    super();
    this.model = null;
    this.inputNewListName = null;
    this.cardName = null;
  }

  changeNewListName(newName: string) {
    this.inputNewListName = newName;
  }
}
