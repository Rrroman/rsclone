export default class AuthController {
  mainElement: any;

  constructor(public appModel: unknown, public authView: any) {
    this.authView
      .on({
        event: 'signin',
        listener: (event: Event) => this.createUser(event),
      })
      .on({
        event: 'login',
        listener: (event: Event) => this.login(event),
      });
  }

  createUser(event: Event) {
    this.authView.createUser(event);
  }

  login(event: Event) {
    this.authView.login(event);
  }
}
