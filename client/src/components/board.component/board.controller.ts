export default class BoardController {
  constructor(
    public boardModel: { [key: string]: any },
    public boardViewer: any
  ) {
    this.boardViewer
      .on({
        event: 'dragover',
        listener: (event: Event) => this.dragListOver(event),
      })
      .on({
        event: 'boardMousedown',
        listener: (event: Event) => this.boardMousedown(event),
      })
      .on({
        event: 'boardMouseup',
        listener: () => this.boardDragStop(),
      })
      .on({
        event: 'boardMousemove',
        listener: (event: Event) => this.boardDragMove(event),
      });
  }

  dragListOver(event: Event) {
    event.preventDefault();
    this.boardViewer.appendDraggableList(event);
  }

  boardMousedown(event: Event) {
    this.boardViewer.boardMousedown(event);
  }

  boardDragStop() {
    this.boardViewer.boardDragStop();
  }

  boardDragMove(event: Event) {
    this.boardViewer.boardDragMove(event);
  }
}
