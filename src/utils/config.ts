import { Sections } from './types/prop-types';

export const API_URL: string = 'https://norma.nomoreparties.space/api';

export const SECTIONS: [Sections, string][] = [
  [Sections.bun, 'Булки'],
  [Sections.sauce, 'Соусы'],
  [Sections.main, 'Начинки'],
];

interface AppRoutes {
  index: string;
  noMatch: string;
  ingredients: string;
  ingredientsById: string;
  login: string;
  logout: string;
  register: string;
  forgotPassword: string;
  resetPassword: string;
  profile: {
    root: string;
    orders: string;
    orderByNumber: string;
  };
  feed: string;
  feedByNumber: string;
}

export const ROUTES: AppRoutes = {
  index: '/',
  noMatch: '*',
  ingredients: '/ingredients',
  ingredientsById: '/ingredients/:id',
  login: '/login',
  logout: '/logout',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: {
    root: '/profile',
    orders: '/profile/orders',
    orderByNumber: '/profile/orders/:orderNumber',
  },
  feed: '/feed',
  feedByNumber: '/feed/:orderNumber',
};
