import CONFIG from '../../global/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="container-restaurant">
      <h1 tabindex="0" class="restaurant__title">${restaurant.name}</h1>
      <img tabindex="0" class="restaurant__poster" src="${CONFIG.BASE_IMAGE_URL.MEDIUM + restaurant.pictureId}" crossorigin="anonymous" alt="${restaurant.name}" />
      <div class="restaurant__info">
        <h2 tabindex="0">Information</h2>
        <h3 tabindex="0">Address</h3>
        <p tabindex="0">${restaurant.address}</p>
        <h3 tabindex="0">City</h3>
        <p tabindex="0">${restaurant.city}</p>
        <h3 tabindex="0">Description</h3>
        <p tabindex="0">${restaurant.description} minutes</p>
        <h3 tabindex="0">Rating</h3>
        <p tabindex="0">${restaurant.rating}</p>
        <h3 tabindex="0">Menus</h3>
        <div class="menus">
          <div class="foods">
            <h4 tabindex="0">Foods</h4>
            <ul>
              ${restaurant.menus.foods.map((food) => `<li tabindex="0">${food.name}</li>`).join('')}
            </ul>
          </div>
          <div class="drinks">
            <h4 tabindex="0">Drinks</h4>
            <ul>
              ${restaurant.menus.drinks.map((drink) => `<li tabindex="0">${drink.name}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
  </div>
  <div class="container-customer-reviews">
  <h2 tabindex="0">Customer Reviews</h2>
    <div class="restaurant__customer-reviews">

    </div>
  </div>
  <div class="container-input-review">
    <div class="floating-form">
      <h2 tabindex="0">Review Box</h2>
      <form id="inputForm" class="input-form">
        <div class="form-group">
          <label for="name">Name</label><br>
          <input type="text" id="name" class="name name-reviewer" maxlength="30" required>
        </div>

        <div class="form-group">
          <label for="body">Review</label><br>
          <textarea id="body" class="body body-review" required></textarea>
        </div>

        <button type="submit">Send</button>
      </form>
    </div>
  </div>
`;

const createRestaurantItemTemplate = () => '<card-list></card-list>';

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createCardCustomerReviewTemplate = (reviews) => {
  const cards = document.createElement('div');
  cards.classList.add('cards');
  cards.innerHTML = `
  ${reviews.customerReviews.map((customerReview) => `
  <div class="card__customer-review">
    <h3 tabindex="0">${customerReview.name}</h3>
    <p tabindex="0">${customerReview.review}</p>
  </div>
  `).join('')}
  `;
  return cards;
};

const createNewCardCustomerReviewTemplate = (review) => {
  const card = document.createElement('div');
  card.classList.add('card__customer-review');
  card.innerHTML = `
    <h3 tabindex="0">${review.name}</h3>
    <p tabindex="0">${review.review}</p>
  `;
  return card;
};

export {
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createCardCustomerReviewTemplate,
  createNewCardCustomerReviewTemplate,
};
