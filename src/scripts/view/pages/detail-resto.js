/* eslint-disable import/no-cycle */
import Swal from 'sweetalert2';
import RestaurantsSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import { createCardCustomerReviewTemplate, createNewCardCustomerReviewTemplate, createRestaurantDetailTemplate } from '../template/template-creator';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantsSource.detailRestaurant(url.id);
    const { restaurant: resultRestaurant } = restaurant;
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML += createRestaurantDetailTemplate(resultRestaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: resultRestaurant.id,
        pictureId: resultRestaurant.pictureId,
        name: resultRestaurant.name,
        city: resultRestaurant.city,
        rating: resultRestaurant.rating,
        description: resultRestaurant.description,
      },
    });
    this.renderCustomerReviews(resultRestaurant);

    const submitForm = document.querySelector('.floating-form');
    submitForm.addEventListener('submit', this.handleSubmitReview.bind(this));
  },

  async renderCustomerReviews(resultRestaurant) {
    const containerCustomerReviews = document.querySelector('.restaurant__customer-reviews');
    containerCustomerReviews.innerHTML = '';
    containerCustomerReviews.appendChild(createCardCustomerReviewTemplate(resultRestaurant));
  },

  async handleSubmitReview(event) {
    event.preventDefault();
    const nameInput = document.querySelector('.name-reviewer').value;
    const reviewInput = document.querySelector('.body-review').value;

    function htmlspecialchars(str) {
      if (typeof str !== 'string') return str;
      return str.replace(/[&<>"']/g, (match) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }[match]));
    }

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { id } = url;
    const name = htmlspecialchars(nameInput);
    const review = htmlspecialchars(reviewInput);
    const newReview = { id, name, review };

    try {
      // Menggunakan try-catch untuk menangani kesalahan
      await RestaurantsSource.postReview(newReview);

      // Memanggil renderCustomerReviews setelah mengirim review baru
      const containerCardCustomerReviews = document.querySelector('.cards');
      containerCardCustomerReviews.appendChild(createNewCardCustomerReviewTemplate(newReview));

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your review has been successfully sent',
        showConfirmButton: false,
        timer: 1500,
      });

      document.querySelector('.name-reviewer').value = '';
      document.querySelector('.body-review').value = '';
    } catch (error) {
      // Menampilkan pesan kesalahan jika pengiriman review gagal
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Failed to send review, Something went wrong!',
        text: 'Please try again later.',
        showConfirmButton: true,
      });
    }
  },

};

export default Detail;
