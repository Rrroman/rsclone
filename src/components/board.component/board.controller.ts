export default class BoardController {
  constructor(
    public boardModel: { [key: string]: any },
    public boardViewer: any
  ) {
    this.boardViewer.on({
      event: 'dragover',
      listener: (event: Event) => this.dragOverFunc(event),
    });
  }

  dragOverFunc(event: Event) {
    event.preventDefault();
    this.boardViewer.appendDraggableList(event);
  }
}
