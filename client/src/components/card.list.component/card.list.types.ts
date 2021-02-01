import { Card } from '../card.component/card.types';

export type List = {
  _id?: string;
  name: string;
  order: number;
  boardId: string;
  cards: Card[];
};
