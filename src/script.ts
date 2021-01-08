import './components/app.component/style.css';
import App from './components/app.component/app.view';

require.context('./assets/img', true, /\.(png|svg|jpg|gif)$/);

const body = document.querySelector('body');

const app = new App(null, { body });
app.show();
