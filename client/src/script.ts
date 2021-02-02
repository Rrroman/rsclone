import './global.css';
import Auth from './components/auth.component/auth.view';
import AuthController from './components/auth.component/auth.controller';
import BoardModel from './components/board.component/board.model';

require.context('./assets/img', true, /\.(png|svg|jpg|gif)$/);

const boardModel = new BoardModel();
const authPage = new Auth(boardModel, document.body);
authPage.show();

new AuthController(boardModel, authPage);
