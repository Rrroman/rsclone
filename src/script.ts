// import '../css/style.css';
import './components/app.component/style.css';
import create from './utils/create';

require.context('./assets/img', true, /\.(png|svg|jpg|gif)$/);

function add(a: string, b: string) {
  return a + b;
}

const body = document.querySelector('body');
const div = document.createElement('div');
div.classList.add('greet');
div.textContent = add('It ', ' working!!!');
body?.appendChild(div);

create('div', { className: 'test', child: 'NEW SUPER TEXT', parent: body });
