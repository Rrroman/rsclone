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
        event: 'copyListEvent',
        listener: () => this.copyListHandler(),
      });
  }

  closeMenu() {
    this.menu.closeMenu();
  }

  addCardHandler() {
    this.menu.addCardHandler();
  }

  copyListHandler() {
    this.menu.copyListHandler();
  }
}
