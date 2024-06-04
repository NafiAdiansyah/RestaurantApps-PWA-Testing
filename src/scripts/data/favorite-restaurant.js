/* eslint-disable consistent-return */
import { openDB } from 'idb';
import CONFIG from '../global/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME.restaurant, { keyPath: 'id' });
  },
});

const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    if (!id) {
      return;
    }
    return (await dbPromise).get(OBJECT_STORE_NAME.restaurant, id);
  },
  async getAllRestaurants() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME.restaurant);
  },
  async putRestaurant(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }
    return (await dbPromise).put(OBJECT_STORE_NAME.restaurant, restaurant);
  },
  async deleteRestaurant(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME.restaurant, id);
  },
};

export default FavoriteRestaurantIdb;
