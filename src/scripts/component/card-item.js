import CONFIG from '../global/config';
import 'lazysizes';

export default class CardItem extends HTMLElement {
  constructor() {
    super();
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `    
    .list_resto {
      box-shadow: 0 4px 8px 0 black;
      width: 100%;
      max-height: 500px;
      overflow: hidden;
      position: relative;
      border-radius: 5px;
      background-color: #ECE3CE;
      display: flex;
      flex-direction: column;
    }
    
    .city {
      display: flex;
      align-items: center;
      position: absolute;
      top: 2px;
      left: 2px;
      background-color: #79ac78da;
      padding: 8px 10px;
      border-radius: 5px 0 10px 0;
      color: white;
      font-weight: 700;
    }
    
    .list_resto_content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    
    .list_resto_logo {
      width: 100%;
      height: 180px;
      overflow: hidden;
    }

    .list_resto_logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.5s ease;
    }
    
    .list_resto_logo:hover {
      opacity: 0.85;
      transform: scale(1.1);
    }
    
    .list_resto_rating {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: rgb(238, 255, 0);
      font-weight: 500;
      margin-bottom: 10px;
    }
    
    .list_resto_rating_value {
      display: flex;
      color: black;
      text-decoration: none;
      font-size: 15px;
      min-height: 44px;
      min-width: 44px;
      align-items: center;
      justify-content: center;
    }
    
    .list_resto_rating span {
      border-radius: 50%;
      margin-right: 5px;
      background-color: #43766c8c;
    }
    
    .list_resto_rating_value:hover {
      opacity: 0.6;
    }
    
    .list_resto_title {
      text-decoration: none;
      color: inherit;
      font-weight: 800;
      font-size: 1.5rem;
      margin-top: 5px;
      transition: 0.4s opacity;
      min-height: 44px;
      min-width: 44px;
    }

    .list_resto_title:hover {
      opacity: 0.5;
      text-decoration: underline #43766C;
    }
    
    .list_resto_description {
      margin-top: 5px;
      font-size: 12px;
      line-height: 1.5em;
      display: -webkit-box;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;
  }

  set card(value) {
    this._card = value;
    this.render();
  }

  get card() {
    return this._card;
  }

  static truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) : text;
  }

  render() {
    this._updateStyle();

    this.appendChild(this._style);
    const truncatedDescription = CardItem.truncateText(this._card.description, 700);
    const imageUrlSmall = `${CONFIG.BASE_IMAGE_URL.SMALL}${this._card.pictureId}`;
    const imageUrlMedium = `${CONFIG.BASE_IMAGE_URL.MEDIUM}${this._card.pictureId}`;
    const imageUrlLarge = `${CONFIG.BASE_IMAGE_URL.LARGE}${this._card.pictureId}`;

    this.innerHTML += `
      <div class="list_resto">
        <img class="list_resto_logo lazyload" 
             data-src="${imageUrlMedium}" 
             data-srcset="
               ${imageUrlSmall} 480w,
               ${imageUrlMedium} 800w,
               ${imageUrlLarge} 1200w
             " 
             sizes="(max-width: 600px) 480px, 
                    (max-width: 1200px) 800px, 
                    1200px"
             crossorigin="anonymous" 
             alt="${this._card.name}" 
             title="${this._card.name}">
        <div class="city"><span class="material-symbols-outlined">
        location_on
        </span>${this._card.city}</div>
        <div class="list_resto_content">
          <a href="/#/detail/${this._card.id}" class="list_resto_title">${this._card.name}</a>
          <p class="list_resto_rating">
            <span class="material-symbols-outlined">star</span>
            <a href="#" class="list_resto_rating_value">${this._card.rating}</a>
          </p>
          <div class="list_resto_description">${truncatedDescription}</div>
        </div>
      </div>
    `;
  }
}
