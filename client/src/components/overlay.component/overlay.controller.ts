export default class OverlayController {
  overlayViewer: any;

  constructor(public appModel: { [key: string]: any }, public viewer: any) {
    this.overlayViewer = viewer;
    this.overlayViewer.on({
      event: 'closeOverlay',
      listener: (event: Event) => this.closeOverlay(event),
    });
  }

  closeOverlay(event: Event) {
    this.overlayViewer.closeOverlay(event);
  }
}
