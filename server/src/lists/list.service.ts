import { List } from './list.types';
import { RSMongoClient } from '../db-client/mongo-client';

export const getListsService = (mongoClient: RSMongoClient) => {
  const getCollection = async () => {
    const db = await mongoClient.connect();
    return db.collection('lists');
  };

  return {
    async create({
      name,
      order,
      boardId,
      userName,
    }: {
      name: string;
      order: string;
      boardId: string;
      userName: string;
    }): Promise<{ data: List }> {
      const collection = await getCollection();

      const createdAt = new Date();

      const { ops } = await collection.insertOne({
        createdAt,
        updatedAt: createdAt,
        name,
        order,
        boardId,
        userName,
      });

      return { data: ops[0] };
    },
  };
};
