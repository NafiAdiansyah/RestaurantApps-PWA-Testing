/* eslint-disable no-undef */
const assert = require('assert'); // Tambahkan impor assert

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.see('No favorite restaurants available', '.restaurants');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('No favorite restaurants available', '.restaurants');

  I.amOnPage('/');

  I.seeElement('.list_resto_title');
  const firstRestaurant = locate('.list_resto_title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.list_resto');

  const likedRestaurantTitle = await I.grabTextFrom('.list_resto_title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  // Batal menyukai restoran
  I.seeElement('.list_resto_title');
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.dontSeeElement('.list_resto');

  I.see('No favorite restaurants available', '.restaurants');
});
