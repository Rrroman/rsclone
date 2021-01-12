import './overlay.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

export default class OverlayView extends EventEmitter {
  constructor(public model: any, public appBody: HTMLElement) {
    super();
  }

  show() {
    this.createOverlay();
  }

  createOverlay() {
    const overlay = create('div', {
      className: 'overlay',
      parent: this.appBody,
    });

    const popup = create('div', {
      className: 'popup',
      parent: overlay,
    });
    create('div', {
      className: 'popup__inner',
      parent: popup,
    });
  }
}
