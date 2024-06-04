import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import App from './view/app';
import CardItem from './component/card-item';
import CardList from './component/card-list';
import LoadingIndicator from './component/loading-indicator';
import swRegister from './utils/sw-register';
import Utils from './utils/utils';

customElements.define('card-list', CardList);
customElements.define('card-item', CardItem);
customElements.define('loading-indicator', LoadingIndicator);

const app = new App({
  menuToggle: document.querySelector('.menu-toggle'),
  nav: document.querySelector('header nav ul'),
  content: document.querySelector('main .container'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  Utils.showLoading();
  app.renderPage().then(() => {
    Utils.hideLoading();
  });
  swRegister();
});
