import EventEmitter from '../../utils/eventEmitter';
import HeaderView from '../header.component/header.view';
import MainView from '../main.component/main.view';
import FooterView from '../footer.component/footer.view';
import OverlayView from '../overlay.component/overlay.view';
import AppModel from './app.model';
import AppController from './app.controller';
import OverlayController from '../overlay.component/overlay.controller';
import HeaderController from '../header.component/header.controller';
import create from '../../utils/create';
import styles from './app.module.css';

export default class AppView extends EventEmitter {
  constructor(public boardModel: any, public body: any) {
    super();
  }

  show() {
    const appModel = new AppModel();
    this.boardModel
      .fetchBoard()
      .then(() => {
        const mainWrapper = create('main', {
          className: styles.main,
          parent: this.body,
        });
        const header = new HeaderView(this.boardModel, this.body, mainWrapper);
        const main = new MainView(this.boardModel, mainWrapper);
        const footer = new FooterView(null, this.body);
        const overlay = new OverlayView(this.boardModel, this.body);

        header.show();
        main.show();
        footer.show();
        overlay.show();

        new OverlayController(appModel, overlay);
        new AppController(appModel, main);
        new HeaderController(this.boardModel, header);
      })
      .catch((err: Error) => console.log('err in board fetch', err));
  }
}
