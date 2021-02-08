export default class HeaderController {
  constructor(
    public boardModel: { [key: string]: any },
    public headerViewer: any
  ) {
    this.headerViewer
      .on({
        event: 'openBoardMenu',
        listener: () => this.openBoardMenu(),
      })
      .on({
        event: 'toggleLogout',
        listener: (event: Event) => this.toggleLogout(event),
      })
      .on({
        event: 'logout',
        listener: (event: Event) => this.logout(event),
      });
  }

  logout(event: Event) {
    this.headerViewer.logout(event);
  }

  toggleLogout(event: Event) {
    this.headerViewer.toggleLogout(event.target);
  }

  openBoardMenu() {
    this.headerViewer.openBoardMenu();
  }
}
