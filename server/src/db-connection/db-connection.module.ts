import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient, Db } from 'mongodb';

export const DbConnectionKey = Symbol('DATABASE_CONNECTION');

@Module({
  providers: [
    {
      provide: DbConnectionKey,
      useFactory: async (configService: ConfigService): Promise<Db> => {
        try {
          const user = configService.get<string>('DB_USER');
          const password = configService.get<string>('DB_PASSWORD');
          const uri = `mongodb+srv://${user}:${password}@rsclone.oiwhe.mongodb.net/rsclone?retryWrites=true&w=majority`;

          const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
          });

          const db = client.db('rsclone');

          return db;
        } catch (e) {
          throw e;
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: [DbConnectionKey],
})
export class DbConnection {}
