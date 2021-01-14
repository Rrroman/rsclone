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

    const popup = popupView.createPopup();

    this.overlay = create('div', {
      className: styles.overlay,
      child: popup,
      parent: this.appBody,
    });

    return this.overlay;
  }
}
