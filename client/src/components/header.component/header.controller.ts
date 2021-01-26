export default class HeaderController {
  constructor(
    public boardModel: { [key: string]: any },
    public headerViewer: any
  ) {
    this.headerViewer.on({
      event: 'openBoardMenu',
      listener: () => this.openBoardMenu(),
    });
  }

  openBoardMenu() {
    this.headerViewer.openBoardMenu();
  }
}
