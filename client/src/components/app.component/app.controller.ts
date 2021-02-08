export default class AppController {
  mainElement: any;

  constructor(public appModel: { [key: string]: any }, public main: any) {
    this.mainElement = main;
  }
}
