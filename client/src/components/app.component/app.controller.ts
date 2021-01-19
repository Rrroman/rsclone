export default class AppController {
  mainElement: any;

  constructor(public appModel: { [key: string]: any }, public main: any) {
    this.mainElement = main;
    this.main.on({
      event: 'documentLoaded',
      listener: (overlayElement: HTMLElement) =>
        this.addElementToModel(overlayElement),
    });
  }

  addElementToModel(overlayElement: HTMLElement) {
    this.appModel.overlayElement = overlayElement;
  }
}
