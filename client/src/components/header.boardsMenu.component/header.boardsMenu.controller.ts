export default class HeaderBoardsMenuController {
  constructor(
    public boardModel: { [key: string]: any },
    public menuViewer: any
  ) {
    this.menuViewer
      .on({
        event: 'openBoardMenu',
        listener: () => this.openBoardMenu(),
      })
      .on({
        event: 'closeMenu',
        listener: () => this.closeMenu(),
      })
      .on({
        event: 'showBoardInputForm',
        listener: () => this.showBoardInputForm(),
      })
      .on({
        event: 'closeBottomBlock',
        listener: () => this.closeBottomBlock(),
      })
      .on({
        event: 'addNewBoard',
        listener: () => this.addNewBoard(),
      })
      .on({
        event: 'renderBoard',
        listener: (event: Event) => this.renderBoard(event),
      });
  }

  openBoardMenu() {
    this.menuViewer.openBoardMenu();
  }

  closeMenu() {
    this.menuViewer.closeMenu();
  }

  showBoardInputForm() {
    this.menuViewer.showBoardInputForm();
  }

  closeBottomBlock() {
    this.menuViewer.closeBottomBlock();
  }

  addNewBoard() {
    this.menuViewer.addNewBoard();
  }

  renderBoard(event: Event) {
    this.boardModel.currentBoardIndex = (event.target as HTMLElement)?.dataset.index;
    this.menuViewer.renderBoard();
  }
}
