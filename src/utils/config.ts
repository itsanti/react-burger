export const API_URL: string = 'https://norma.nomoreparties.space/api';

export const SECTIONS: [string, string][] = [
  ['bun', 'Булки'],
  ['sauce', 'Соусы'],
  ['main', 'Начинки'],
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
  };
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
  },
};
