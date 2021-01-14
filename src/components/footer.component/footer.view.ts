import './footer.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';
import createIcon from '../../utils/createIcon';
import { rsLogo } from '../../utils/icons';

export default class FooterView extends EventEmitter {
  constructor(public model: unknown, public elements: any) {
    super();
  }

  show() {
    this.createFooter();
  }

  createFooter() {
    const footer = create('footer', { className: 'footer' });

    const footerContainer = create('div', {
      className: 'footer_container',
      child: null,
      parent: footer,
    });

    const footerInfo = create('div', {
      className: 'footer_info',
      child: null,
      parent: footerContainer,
    });

    create('div', {
      className: 'year',
      child: 'created in 2021 by',
      parent: footerInfo,
    });

    const RSlogo = createIcon('rs_logo', rsLogo);
    const rsLink = create('div', {
      className: 'rs_link',
      child: RSlogo,
      parent: footerInfo,
    });

    create('a', {
      className: 'rs_link',
      child: null,
      parent: rsLink,
      dataAttr: [['href', 'https://rs.school/js/']],
    });

    const gitHubLinks = create('div', {
      className: 'github_links',
      child: null,
      parent: footerInfo,
    });

    create('a', {
      className: 'github_link',
      child: 'Gaziz666',
      parent: gitHubLinks,
      dataAttr: [['href', 'https://github.com/Gaziz666']],
    });

    create('a', {
      className: 'github_link',
      child: 'Rrroman',
      parent: gitHubLinks,
      dataAttr: [['href', 'https://github.com/Rrroman']],
    });

    create('a', {
      className: 'github_link',
      child: 'filonushka',
      parent: gitHubLinks,
      dataAttr: [['href', 'https://github.com/filonushka']],
    });

    this.elements.prepend(footer);
  }
}
