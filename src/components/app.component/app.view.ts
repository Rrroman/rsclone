import EventEmitter from '../../utils/eventEmitter';
import HeaderView from '../header.component/header.view';
import MainView from '../main.component/main.view';
import FooterView from '../footer.component/footer.view';

export default class AppView extends EventEmitter {
  constructor(public model: unknown, public elements: any) {
    super();
  }

  show() {
    const header = new HeaderView(null, this.elements.body);
    const footer = new FooterView(null, this.elements.body);
    const main = new MainView(null, this.elements.body);

    footer.show();
    main.show();
    header.show();
  }
}
