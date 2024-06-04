import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import Utils from '../utils/utils';

class App {
  constructor({
    menuToggle,
    nav,
    content,
  }) {
    this._menuToggle = menuToggle;
    this._nav = nav;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._menuToggle,
      drawer: this._nav,
      content: this._content,
    });
  }

  async renderPage() {
    Utils.showLoading();
    try {
      const url = UrlParser.parseActiveUrlWithCombiner();
      const page = routes[url];
      this._content.innerHTML = await page.render();
      await page.afterRender();
      const skipLinkElem = document.querySelector('.skip-link');
      skipLinkElem.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#mainContent').focus();
      });
    } catch (error) {
      console.error('Error rendering page:', error);
    } finally {
      Utils.hideLoading();
    }
  }
}

export default App;
