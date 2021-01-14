export default class CardController {
  cardViewer: any;

  constructor(public boardModel: { [key: string]: any }, public viewer: any) {
    this.cardViewer = viewer;
    this.cardViewer.on({
      event: 'cardClick',
      listener: (event: Event) => this.openOverlay(event),
    });
  }

  openOverlay(event: Event) {
    this.cardViewer.openOverlay(event);
  }
}
