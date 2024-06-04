// components/card-list.js
import CardItem from './card-item';

export default class CardList extends HTMLElement {
  constructor() {
    super();

    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
        card-list {
            display: block;
          }

        .card-list-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
            gap: 20px;
            padding: 1rem 2rem;
        }

        @media screen and (max-width:1200px) {
          .card-list-container {
            padding: 1rem 5rem;
          }
        }

        @media screen and (max-width:768px) {
          .card-list-container {
            padding: 1rem 3.5rem;
          }
        }

        @media screen and (max-width:576px) {
          .card-list-container {
            padding: 1rem 4rem;
          }
        }

        @media screen and (max-width:384px) {
          .card-list-container {
            padding: 1rem 1.5rem;
          }
        }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._updateStyle();

    this.appendChild(this._style);
    this.innerHTML += `
      <div class="card-list-container">
      </div>
    `;
  }
}

export const renderRestaurantCards = (card) => {
  const cardListContainer = document
    .querySelector('card-list')
    .querySelector('.card-list-container');

  const cardItem = new CardItem();
  cardItem.card = card;
  cardListContainer.appendChild(cardItem);
};
