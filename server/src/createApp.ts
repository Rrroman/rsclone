import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { getBoardsRouter } from './boards/boards.router';
import { RSMongoClient } from './db-client/mongo-client';

export const createApp = (mongoClient: RSMongoClient) => {
  const app = express();

  app.use(morgan('dev'));
  app.use(bodyParser.json());

  app.use('/api/boards', getBoardsRouter(mongoClient));

  return app;
};
