import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import './boardHeader.css';

export default class BoardHeaderView extends EventEmitter {
  boardContainer: HTMLElement;

  constructor(public model: unknown, public elements: HTMLElement) {
    super();
    this.boardContainer = elements;
  }

  show() {
    this.renderBoardHeader();
  }

  renderBoardHeader() {
    create('div', {
      className: 'board-header',
      child: null,
      parent: this.boardContainer,
    });
  }
}
