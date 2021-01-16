import EventEmitter from '../../utils/eventEmitter';
import HeaderView from '../header.component/header.view';
import MainView from '../main.component/main.view';
import FooterView from '../footer.component/footer.view';
import OverlayView from '../overlay.component/overlay.view';
import AppModel from './app.model';
import AppController from './app.controller';
import OverlayController from '../overlay.component/overlay.controller';

export default class AppView extends EventEmitter {
  constructor(public model: unknown, public elements: any) {
    super();
  }

  show() {
    const appModel = new AppModel();
    const header = new HeaderView(null, this.elements.body);
    const footer = new FooterView(null, this.elements.body);
    const main = new MainView(appModel, this.elements.body);
    const overlay = new OverlayView(null, this.elements.body);

    footer.show();
    main.show();
    header.show();
    const overlayElement = overlay.show();

    // eslint-disable-next-line no-new
    new OverlayController(appModel, overlay);

    // eslint-disable-next-line no-new
    new AppController(appModel, main);

    document.addEventListener('DOMContentLoaded', () => {
      main.emit('documentLoaded', overlayElement);
    });
  }
}
