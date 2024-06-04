import RestaurantsSource from '../../data/restaurantdb-source';
import { createRestaurantItemTemplate } from '../template/template-creator';
import { renderRestaurantCards } from '../../component/card-list';

const Home = {
  async render() {
    return `
      <h2 class="title-section">Explore Restaurant</h2>
        <article class="card-container">
          <card-list></card-list>
      </article>
      `;
  },

  async afterRender() {
    const restaurants = await RestaurantsSource.exploreRestaurant();
    const restaurantsContainer = document.querySelector('article.card-container');
    restaurantsContainer.innerHTML += createRestaurantItemTemplate();
    restaurants.forEach((restaurant) => {
      renderRestaurantCards(restaurant);
    });
  },
};

export default Home;
