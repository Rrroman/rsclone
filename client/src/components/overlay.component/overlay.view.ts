import styles from './overlay.module.css';
import globalStyles from '../../globals.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import PopupView from '../popup.component/popup.view';

export default class OverlayView extends EventEmitter {
  overlay: HTMLElement | null;

  popup: HTMLElement | null;

  constructor(public boardModel: any, public appBody: HTMLElement) {
    super();
    this.overlay = null;
    this.popup = null;
  }

  show() {
    this.createOverlay();
    this.boardModel.overlayElement = this.overlay;
    return this.overlay;
  }

  createOverlay() {
    const popupView = new PopupView(null, this.appBody);

    this.popup = popupView.createPopup();

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
