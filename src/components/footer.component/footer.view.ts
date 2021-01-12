import styles from './footer.module.css';

import EventEmitter from '../../utils/eventEmitter';
import create from '../../utils/create';

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

    const rsLink = create('div', {
      className: styles.rs_link,
      child: null,
      parent: footerContainer,
    });

    const rsLogo = create('a', {
      child: null,
      parent: rsLink,
      dataAttr: [['href', 'https://rs.school/js/']],
    });

    const rsImg = create('img', {
      className: styles.rs_image,
      child: null,
      parent: rsLogo,
      dataAttr: [
        ['src', './assets/img/rs_school_js.svg'],
        ['alt', 'RS School logo'],
      ],
    });

    const gitHubInfo = create('div', {
      className: styles.github_info,
      child: null,
      parent: footerContainer,
    });

    const year = create('div', {
      className: styles.year,
      child: 'created in 2020 by',
      parent: gitHubInfo,
    });

    const gitHubLinks = create('div', {
      className: styles.github_links,
      child: null,
      parent: gitHubInfo,
    });

    const gitHubLogo = create('img', {
      className: styles.github_logo,
      child: null,
      parent: gitHubInfo,
      dataAttr: [
        ['src', './assets/img/github-logo.svg'],
        ['alt', 'GitHub logo'],
      ],
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

    rsLogo.append(rsImg);
    rsLink.append(rsLogo);
    gitHubInfo.append(year, gitHubLogo, gitHubLinks);
    footerContainer.append(rsLink, gitHubInfo);
    footer.append(footerContainer);
    this.elements.prepend(footer);
  }
}
