import EventEmitter from '../../utils/eventEmitter';

export default class AppModel extends EventEmitter {
  overlayElement: HTMLElement | null;

  constructor() {
    super();

    this.overlayElement = null;
  }
}
