import { PropsWithChildren, ReactElement } from 'react';

export enum Sections {
  bun = 'bun',
  main = 'main',
  sauce = 'sauce',
}

export type BurgerIngredientProps = {
  ingredient: IngredientProps;
};

export type IngredientProps = {
  _id: string;
  name: string;
  type: Sections;
  proteins: number;
  fat: number;
  carbohydrates: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  uuid?: string;
  calories: number;
};

export type IUser = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type IOrder = {
  ingredients: IngredientProps[];
  _id: string;
  owner: IUser;
  status: 'done';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
};

export type OrderDetailsProps = {
  number: number;
};

export type OrderProps = {
  order: OrderDetailsProps;
};

export type IngredientItemPick = Pick<IngredientProps, '_id' | 'type'>;
export type ConstructorElementDnD = { id: string; index: number };

export type BurgerConstructorElementProps = {
  index: number;
  element: IngredientProps;
  handleClose: (type: string, uuid?: string) => void;
};

export type ModalProps = PropsWithChildren<{
  title?: string;
  setIsModalOpened: (mode?: boolean) => void;
}>;

export type ModalOverlayProps = {
  onModalClosed: (mode: boolean) => void;
};

export type ProtectedProps = {
  onlyUnAuth?: boolean;
  component: ReactElement;
};

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  OPEN = 'ONLINE',
  CLOSING = 'CLOSING',
  CLOSED = 'OFFLINE',
}

export enum OrderStatus {
  created = 'created',
  pending = 'pending',
  done = 'done',
}

export const OrderStatusI18n = {
  [OrderStatus.created]: 'Создан',
  [OrderStatus.pending]: 'Готовится',
  [OrderStatus.done]: 'Выполнен',
};

export type OrdersList = {
  ingredients: string[];
  _id: string;
  status: OrderStatus;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TMessage = {
  success: boolean;
  orders: OrdersList[];
  total: number;
  totalToday: number;
};

export type TwsActions = {
  wsInit: string;
  wsClose: string;
  wsSendMessage?: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};
