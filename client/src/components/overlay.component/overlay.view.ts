import styles from './overlay.module.css';
import globalStyles from '../../globals.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

export default class OverlayView extends EventEmitter {
  overlay: HTMLElement | null;

  popup: HTMLElement | null;

  constructor(public appModel: any, public appBody: HTMLElement) {
    super();
    this.overlay = null;
    this.popup = null;
  }

  show() {
    this.createOverlay();
    this.appModel.overlayElement = this.overlay;
    return this.overlay;
  }

  createOverlay() {
    this.popup = create('div', {
      className: styles.popup,
      parent: this.overlay,
      dataAttr: [['data-popup', '']],
    });

    this.overlay = create('div', {
      className: `${styles.overlay} ${globalStyles.hidden}`,
      child: this.popup,
      parent: this.appBody,
    });

    this.overlay.addEventListener('click', (event: Event) =>
      this.emit('closeOverlay', event)
    );
  }

  closeOverlay(event: Event) {
    if (event.target === this.overlay) {
      this.overlay?.classList.add(globalStyles.hidden);
      this.popup!.innerHTML = '';
    }
  }
}
