import express from 'express';

import { getListsService } from './list.service';
import { RSMongoClient } from '../db-client/mongo-client';
// import { List } from './list.types';

export const getListsRouter = (mongoClient: RSMongoClient) => {
  const router = express.Router();
  const listsService = getListsService(mongoClient);

  router.post(`/new`, async (req, res, next) => {
    try {
      const data = await listsService.create(req.body);
      res.json({ data });
    } catch (err) {
      next(err);
    }
  });

  return router;
};
