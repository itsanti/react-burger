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
