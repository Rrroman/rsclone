import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { getBoardsRouter } from './boards/boards.router';
import { RSMongoClient } from './db-client/mongo-client';
import { getUsersRouter } from './users/users.router';
import { getListsRouter } from './lists/list.router';

export const createApp = (mongoClient: RSMongoClient) => {
  const app = express();

  // If your lib folder is on any other location then specify the absolute path to the lib folder like app.use(express.static('path to lib from /');
  app.use(express.static('/../client/dist'));
  app.get('*', (req, res) => {
    res.sendFile('/../client/dist/index.html');
  });

  app.use(morgan('dev'));
  app.use(cors());
  app.use(bodyParser.json());

  app.use('/api/board', getBoardsRouter(mongoClient));
  app.use('/api/user', getUsersRouter(mongoClient));
  app.use('/api/list', getListsRouter(mongoClient));

  return app;
};
