import EventEmitter from '../../utils/eventEmitter';
import HeaderView from '../header.component/header.view';
import MainView from '../main.component/main.view';
import FooterView from '../footer.component/footer.view';
import OverlayView from '../overlay.component/overlay.view';
import AppModel from './app.model';
import AppController from './app.controller';
import OverlayController from '../overlay.component/overlay.controller';
import BoardModel from '../board.component/board.model';

export default class AppView extends EventEmitter {
  constructor(public model: unknown, public body: any) {
    super();
  }

  show() {
    const appModel = new AppModel();
    const boardModel = new BoardModel();
    const header = new HeaderView(boardModel, this.body);
    const footer = new FooterView(null, this.body);
    const main = new MainView(appModel, this.body);
    const overlay = new OverlayView(appModel, this.body);

    footer.show();
    main.show();
    header.show();
    overlay.show();

    new OverlayController(appModel, overlay);

    new AppController(appModel, main);
  }
}
