export default class ListMenuController {
  menu: any;

  constructor(public boardModel: { [key: string]: any }, public viewer: any) {
    this.menu = viewer;
    this.menu
      .on({
        event: 'closemenu',
        listener: () => this.closeMenu(),
      })
      .on({
        event: 'addCardEvent',
        listener: () => this.addCardHandler(),
      })
      .on({
        event: 'renderCopyBlock',
        listener: () => this.renderCopyBlock(),
      })
      .on({
        event: 'closeActiveBlock',
        listener: (event: Event) => this.closeActiveBlock(event),
      })
      .on({
        event: 'createListCopy',
        listener: () => this.createListCopy(),
      })
      .on({
        event: 'renderMoveBlock',
        listener: () => this.renderMoveBlock(),
      })
      .on({
        event: 'moveListTo',
        listener: () => this.moveListTo(),
      });
  }

  closeMenu() {
    this.menu.closeMenu();
  }

  addCardHandler() {
    this.menu.addCardHandler();
  }

  renderCopyBlock() {
    this.menu.renderCopyBlock();
  }

  closeActiveBlock(event: Event) {
    event.stopPropagation();
    this.menu.closeActiveBlock();
  }

  createListCopy() {
    this.menu.createListCopy(null);
  }

  renderMoveBlock() {
    this.menu.renderMoveBlock();
  }

  moveListTo() {
    this.menu.moveListTo();
  }
}
