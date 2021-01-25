import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import styles from './boardHeader.module.css';

export default class BoardHeaderView extends EventEmitter {
  boardContainer: HTMLElement;

  constructor(public model: unknown, public elements: HTMLElement) {
    super();
    this.boardContainer = elements;
  }

  show() {
    XMLDocument;
    this.renderBoardHeader();
  }

  renderBoardHeader() {
    create('div', {
      className: styles['board-header'],
      child: null,
      parent: this.boardContainer,
    });
  }
}
