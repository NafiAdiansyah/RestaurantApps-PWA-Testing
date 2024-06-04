import Home from '../view/pages/home';
import Favorite from '../view/pages/favorite-restaurant';
import Detail from '../view/pages/detail-resto';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
