import { List } from '../card.list.component/card.list.types';

export type Board = {
  _id: string;
  name: string;
  userName: string;
  favorite: boolean;
  updatedAt: string;
  createAt: string;
  order: number;
  lists: List[];
};
