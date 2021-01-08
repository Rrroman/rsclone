import './main.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import AddListCardBtnView from '../addListCard.component/addListCardBtn.view';
import AddListCardBtnController from '../addListCard.component/addListCardBtn.controller';

export default class MainView extends EventEmitter {
  main!: HTMLElement;

  constructor(public model: unknown, public elements: any) {
    super();
  }

  show() {
    this.createMain();
  }

  createMain() {
    this.main = create('main', {
      className: 'main',
      child: null,
    });

    create('h1', {
      className: 'main_title',
      child: 'Main Container',
      parent: this.main,
    });
    // eslint-disable-next-line no-new
    const addBtn = new AddListCardBtnView(this.model, this.main);
    const addBtnElement = addBtn.show();
    // eslint-disable-next-line no-new
    new AddListCardBtnController(null, addBtn);
    this.main.append(addBtnElement);
    this.elements.prepend(this.main);
  }
}
