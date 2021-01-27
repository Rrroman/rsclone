import { List } from './list.types';
import { ObjectId } from 'mongodb';
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

    async remove(id: string) {
      const collection = await getCollection();

      const { deletedCount } = await collection.deleteOne({
        _id: new ObjectId(id),
      });

      return { data: { deletedCount } };
    },

    async update(
      id: string,
      { name, order }: { name: string; order: string }
    ): Promise<{ data: List }> {
      const collection = await getCollection();

      const { value } = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $currentDate: {
            updatedAt: true,
          },
          $set: { name, order },
        },
        { returnOriginal: false }
      );
      return { data: value };
    },

    async findAllByUserBoard({
      userName,
      boardId,
    }: {
      userName: string;
      boardId: string;
    }): Promise<{ data: List[] }> {
      const collection = await getCollection();

      const lists = await collection
        .find<List>({ userName: userName, boardId: boardId })
        .toArray();

      return { data: lists };
    },
  };
};
