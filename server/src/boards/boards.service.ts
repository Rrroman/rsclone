import { ObjectId } from 'mongodb';
import { Board } from './boards.types';
import { RSMongoClient } from '../db-client/mongo-client';

export const getBoardsService = (mongoClient: RSMongoClient) => {
  const getCollection = async () => {
    const db = await mongoClient.connect();
    return db.collection('boards');
  };

  return {
    async create({ name }: { name: string }): Promise<{ data: Board }> {
      const collection = await getCollection();

      const createdAt = new Date();

      const { ops } = await collection.insertOne({
        createdAt,
        updatedAt: createdAt,
        name,
      });

      return { data: ops[0] };
    },

    async findAll(): Promise<{ data: Board[] }> {
      const collection = await getCollection();

      const boards = await collection.find<Board>().toArray();

      return { data: boards };
    },

    async findById(id: string): Promise<{ data: Board | null }> {
      const collection = await getCollection();

      const data = await collection.findOne<Board>({ _id: new ObjectId(id) });

      return { data };
    },

    async update(
      id: string,
      { name }: { name: string }
    ): Promise<{ data: Board }> {
      const collection = await getCollection();

      const { value } = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $currentDate: {
            updatedAt: true,
          },
          $set: { name },
        },
        { returnOriginal: false }
      );
      return { data: value };
    },

    async remove(id: string) {
      const collection = await getCollection();

      const { deletedCount } = await collection.deleteOne({
        _id: new ObjectId(id),
      });

      return { data: { deletedCount } };
    },
  };
};
