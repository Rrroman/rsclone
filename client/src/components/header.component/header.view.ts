import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import styles from './header.module.css';

export default class HeaderView extends EventEmitter {
  header: HTMLElement | null;

  constructor(public model: unknown, public body: any) {
    super();
    this.header = null;
  }

  show() {
    this.createHeader();
  }

  createHeader() {
    const boardButton = create('button', {
      className: styles['header-buttons'],
      child: [
        create('span', {
          className: styles['header-buttons_text'],
          child: 'Boards',
        }),
      ],
    });

    const leftBlock = create('div', {
      className: styles['left-block'],
      child: boardButton,
    });

    const logo = create('h1', {
      className: styles['header-title'],
      child: 'Trello',
    });

    const header = create('header', {
      className: styles.header,
      child: [leftBlock, logo],
    });

    this.body.prepend(header);
  }
}
