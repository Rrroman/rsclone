import './global.css';
import App from './components/app.component/app.view';
// import Auth from './components/auth.component/auth.view';
// import AuthController from './components/auth.component/auth.controller';
import BoardModel from './components/board.component/board.model';

require.context('./assets/img', true, /\.(png|svg|jpg|gif)$/);

const boardModel = new BoardModel();

const app = new App(boardModel, document.body);
app.start();
// const authPage = new Auth(boardModel, document.body);
// authPage.show();

// new AuthController(boardModel, authPage);
