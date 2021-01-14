import styles from './overlay.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import PopupView from '../popup.component/popup.view';

export default class OverlayView extends EventEmitter {
  overlay: HTMLElement | null;

  constructor(public overlayModel: any, public appBody: HTMLElement) {
    super();
    this.overlay = null;
  }

  show() {
    this.createOverlay();
    return this.overlay;
  }

  createOverlay() {
    const popupView = new PopupView(null, this.appBody);

    this.overlay = create('div', {
      className: styles.overlay,
      child: popupView.createPopup(),
      parent: this.appBody,
    });

    return this.overlay;
  }

  // openOverlay() {
  //   if (this.overlay) {
  //     this.overlay.classList.add(styles.show);
  //   }
  // }

  // closeOverlay() {
  //   if (this.overlay) {
  //     this.overlay.classList.add(styles.hidden);
  //   }
  // }
}
