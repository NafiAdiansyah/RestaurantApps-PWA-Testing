const CONFIG = {
  BASE_URL: 'https://restaurant-api.dicoding.dev/',
  BASE_IMAGE_URL: {
    SMALL: 'https://restaurant-api.dicoding.dev/images/small/',
    MEDIUM: 'https://restaurant-api.dicoding.dev/images/medium/',
    LARGE: 'https://restaurant-api.dicoding.dev/images/large/',
  },
  DATABASE_NAME: 'restaurant-catalogue-database',
  DATABASE_VERSION: 1,
  DEFAULT_LANGUAGE: 'en-us',
  CACHE_NAME: new Date().toISOString(),
  OBJECT_STORE_NAME: {
    restaurant: 'restaurants',
    comentUser: 'comment-user',
  },
};

export default CONFIG;
