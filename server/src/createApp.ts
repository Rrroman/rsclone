import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { getBoardsRouter } from './boards/boards.router';
import { RSMongoClient } from './db-client/mongo-client';
import { getUsersRouter } from './users/users.router';
import { getListsRouter } from './lists/list.router';
import { getCardsRouter } from './cards/card.router';

export const createApp = (mongoClient: RSMongoClient) => {
  const app = express();

  app.use(morgan('dev'));
  app.use(cors());
  app.use(bodyParser.json());

  app.use('/api/board', getBoardsRouter(mongoClient));
  app.use('/api/user', getUsersRouter(mongoClient));
  app.use('/api/list', getListsRouter(mongoClient));
  app.use('/api/card', getCardsRouter(mongoClient));

  return app;
};
