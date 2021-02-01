export type Card = {
  _id?: string;
  name: string;
  description: string;
  order: number;
  listId: string;
  listName: string;
  checklists: [];
  labelColorId: string;
  labelTextId: string;
};
