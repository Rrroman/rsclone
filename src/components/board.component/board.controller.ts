export default class BoardController {
  constructor(
    public boardModel: { [key: string]: any },
    public boardViewer: any
  ) {
    this.boardViewer.on({
      event: 'dragover',
      listener: (e: Event) => this.dragOverFunc(e),
    });
  }

  dragOverFunc(e: Event) {
    e.preventDefault();
    this.boardViewer.appendDraggableList(e);
  }
}
