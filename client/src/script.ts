import './global.css';
import App from './components/app.component/app.view';
import Auth from './components/auth.component/auth.view';
import AuthController from './components/auth.component/auth.controller';
import BoardModel from './components/board.component/board.model';

require.context('./assets/img', true, /\.(png|svg|jpg|gif)$/);

const boardModel = new BoardModel();

const userName = localStorage.getItem('user');
const token = localStorage.getItem('token');

if (userName && token) {
  boardModel.dataUser = { name: userName };

  const app = new App(boardModel, document.body);
  app
    .show()
    .then()
    .catch(() => {
      console.log('session is over. Please authorization again');
      authPageOpen();
    });
} else {
  authPageOpen();
}

function authPageOpen() {
  const authPage = new Auth(boardModel, document.body);
  authPage.show();

  new AuthController(boardModel, authPage);
}
