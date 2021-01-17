import styles from './footer.module.css';

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
    const footer = create('footer', { className: styles.footer });

    const footerContainer = create('div', {
      className: styles.footer_container,
      child: null,
      parent: footer,
    });

    const footerInfo = create('div', {
      className: styles.footer_info,
      child: null,
      parent: footerContainer,
    });

    create('div', {
      className: styles.year,
      child: 'created in 2021 by',
      parent: footerInfo,
    });

    const RSlogo = createIcon(styles.rs_logo, rsLogo);

    const rsLink = create('div', {
      className: styles.rs_link,
      child: RSlogo,
      parent: footerInfo,
    });

    create('a', {
      className: styles.rs_link,
      child: null,
      parent: rsLink,
      dataAttr: [['href', 'https://rs.school/js/']],
    });

    const gitHubLinks = create('div', {
      className: styles.github_links,
      child: null,
      parent: footerInfo,
    });

    create('a', {
      className: styles.github_link,
      child: 'Gaziz666',
      parent: gitHubLinks,
      dataAttr: [['href', 'https://github.com/Gaziz666']],
    });

    create('a', {
      className: styles.github_link,
      child: 'Rrroman',
      parent: gitHubLinks,
      dataAttr: [['href', 'https://github.com/Rrroman']],
    });

    create('a', {
      className: styles.github_link,
      child: 'filonushka',
      parent: gitHubLinks,
      dataAttr: [['href', 'https://github.com/filonushka']],
    });

    this.elements.prepend(footer);
  }
}
