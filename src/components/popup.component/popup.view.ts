import styles from './popup.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

export default class PopupView extends EventEmitter {
  constructor(public model: any, public overlay: HTMLElement) {
    super();
  }

  show() {
    this.createPopup();
  }

  createPopup() {
    const popup = create('div', {
      className: styles.popup,
      parent: this.overlay,
    });

    create('div', {
      className: styles.popup__inner,
      parent: popup,
    });

    return popup;
  }
}
