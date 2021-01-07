import './main.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

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

    this.elements.prepend(this.main);
  }
}
