class Utils {
  static showElement(element) {
    const _element = element;
    _element.style.display = 'block';
    _element.hidden = false;
  }

  static hideElement(element) {
    const _element = element;
    _element.style.display = 'none';
    _element.hidden = true;
  }

  static showLoading() {
    const containerElement = document.querySelector('.container');
    const element = document.querySelector('loading-indicator');
    Array.from(containerElement.children).forEach((el) => {
      Utils.hideElement(el);
    });
    Utils.showElement(element);
  }

  static hideLoading() {
    const containerElement = document.querySelector('.container');
    const element = document.querySelector('loading-indicator');
    const titleSectionToCenter = document.querySelector('.container h2');
    Array.from(containerElement.children).forEach((el) => {
      Utils.showElement(el);
    });
    if (titleSectionToCenter) {
      titleSectionToCenter.style.display = 'inline-block';
    }
    Utils.hideElement(element);
  }
}

export default Utils;
