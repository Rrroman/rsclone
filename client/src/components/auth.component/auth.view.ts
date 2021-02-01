import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import styles from './auth.module.css';
import globalStyles from '../../globals.module.css';
import { addBtn } from '../user.kit.component/user.kit.components';
import App from '../app.component/app.view';

export default class Auth extends EventEmitter {
  inputLogin: HTMLElement | null;
  inputPassword: HTMLElement | null;
  errorMessage: null | HTMLElement;
  authPage: null | HTMLElement;

  constructor(public boardModel: any, public elementBody: HTMLElement) {
    super();
    this.inputLogin = null;
    this.inputPassword = null;
    this.errorMessage = null;
    this.authPage = null;
  }

  show() {
    this.renderAuthPage();
  }

  renderAuthPage() {
    this.errorMessage = create('div', {
      className: `${styles['error-message']} ${globalStyles.hidden}`,
    });

    const header = create('div', {
      className: styles['login-header'],
      child: 'Login to Trello Clone',
    });

    this.inputLogin = create('input', {
      className: styles['input-text'],
      dataAttr: [
        ['type', 'text'],
        ['name', 'username'],
        ['autocorrect', 'off'],
        ['spellcheck', 'false'],
        ['autofocus', 'autofocus'],
        ['placeholder', 'login/email'],
        ['autocomplete', 'username'],
      ],
    });

    this.inputPassword = create('input', {
      className: styles['input-text'],
      dataAttr: [
        ['type', 'password'],
        ['name', 'password'],
        ['placeholder', 'password'],
        ['autocomplete', 'current-password'],
      ],
    });

    const textOr = create('div', {
      className: styles['text-or'],
      child: 'OR',
    });
    const loginBtn = addBtn('Log in');
    const createAccount = addBtn('Sign in');

    const form = create('form', {
      className: styles['login-form'],
      child: [
        this.inputLogin,
        this.inputPassword,
        loginBtn,
        textOr,
        createAccount,
      ],
    });

    const authWrapper = create('div', {
      className: styles['auth-wrapper'],
      child: [this.errorMessage, header, form],
    });

    this.authPage = create('section', {
      className: styles['start-page'],
      child: authWrapper,
      parent: this.elementBody,
    });

    createAccount.addEventListener('click', (event) => {
      event.preventDefault();
      if (!event.detail || event.detail == 1) {
        this.emit('signin', event);
      }
    });

    loginBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (!event.detail || event.detail == 1) {
        this.emit('login', event);
      }
    });
  }

  formContent() {
    let name: string = (this.inputLogin as HTMLInputElement).value;
    let password: string = (this.inputPassword as HTMLInputElement).value;

    let obj = {
      name,
      password,
    };
    return obj;
  }

  createUser() {
    const userData: { name: string; password: string } = this.formContent();
    this.boardModel.fetchNewUser(userData).then(() => {
      if (this.checkAuthError()) {
        console.log('error auth');
      }
      this.authPage?.remove();
      const app = new App(this.boardModel, document.body);
      app.show();
    });
  }

  login() {
    const userData: { name: string; password: string } = this.formContent();
    this.boardModel
      .fetchCurrentUser(userData)
      .then(() => {
        if (this.checkAuthError()) {
          return;
        }
        this.authPage?.remove();

        const app = new App(this.boardModel, document.body);
        app.show();
      })
      .catch((err: Error) => console.log('auth err', err));
  }

  checkAuthError() {
    if (this.boardModel.dataError) {
      this.errorMessage?.classList.remove(globalStyles.hidden);
      this.errorMessage!.innerHTML =
        typeof this.boardModel.dataError.errors === 'string'
          ? this.boardModel.dataError.errors
          : this.boardModel.dataError.errors.msg;
      return true;
    }
    return false;
  }
}
