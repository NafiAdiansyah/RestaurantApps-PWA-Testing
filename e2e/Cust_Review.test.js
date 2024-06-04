/* eslint-disable no-undef */
Feature('Customer Reviews');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('submitting a new customer review', async ({ I }) => {
  // Pergi ke halaman detail restoran
  I.seeElement('.list_resto_title');
  const firstRestaurant = locate('.list_resto_title').first();
  I.click(firstRestaurant);

  // Memastikan halaman detail terbuka dan terdapat form ulasan
  I.seeElement('.floating-form');

  // Mengisi form ulasan
  const reviewerName = 'Nafi';
  const reviewText = 'Recommended restaurant!';
  I.fillField('.name-reviewer', reviewerName);
  I.fillField('.body-review', reviewText);

  // Mengirim ulasan
  I.click('.floating-form button[type="submit"]');

  // Memastikan ulasan baru muncul di daftar ulasan
  I.waitForElement('.restaurant__customer-reviews .card__customer-review:last-child');
  I.see(reviewerName, '.restaurant__customer-reviews .card__customer-review:last-child h3');
  I.see(reviewText, '.restaurant__customer-reviews .card__customer-review:last-child p');
});
