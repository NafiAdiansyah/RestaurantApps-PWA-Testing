import { renderRestaurantCards } from '../../component/card-list';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant';
import { createRestaurantItemTemplate } from '../template/template-creator';

const Favorite = {
  async render() {
    return `
    <div class='content-favorite'>
      <div id='restaurants' class='restaurants'>
      <h1 class='content__heading' tabindex='0'>Your Favorite Restaurant</h1>
      </div>
    </div>
  `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');
    const contentHeading = document.querySelector('.content__heading');
    if (restaurants.length === 0) {
      restaurantsContainer.style.display = 'flex';
      restaurantsContainer.style.justifyContent = 'center';
      restaurantsContainer.style.alignItems = 'center';
      restaurantsContainer.style.minHeight = '90vh';
      contentHeading.style.display = 'none';
      restaurantsContainer.innerHTML += '<h3>No favorite restaurants available</h3>';
    } else if (restaurants.length === 1) {
      restaurantsContainer.style.margin = 'auto';
      restaurantsContainer.style.width = '375px';
      restaurantsContainer.style.height = '100vh';
      restaurantsContainer.innerHTML += createRestaurantItemTemplate();
      restaurants.forEach((restaurant) => {
        renderRestaurantCards(restaurant);
      });
    } else {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate();
      restaurants.forEach((restaurant) => {
        renderRestaurantCards(restaurant);
      });
    }
  },
};

export default Favorite;
