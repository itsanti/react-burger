export const API_URL = 'https://norma.nomoreparties.space/api';

export const SECTIONS = [
  ['bun', 'Булки'],
  ['sauce', 'Соусы'],
  ['main', 'Начинки'],
];

export const ROUTES = {
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
  },
};
