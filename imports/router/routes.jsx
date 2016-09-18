import { Home } from '../ui/pages/Home';
import { About } from '../ui/pages/About';
import { NotFound } from '../ui/pages/NotFound';

export const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  }, {
    path: '*',
    component: NotFound
  }
];