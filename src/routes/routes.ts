import { Express } from 'express';
import launchOriginalUrlController from 'src/controllers/launchOriginalUrlController';
import shortUrlController from 'src/controllers/shortUrlController';

const routes = (app: Express): void => {
  app.post('/shortUrl', shortUrlController);
  app.get('/:shortId', launchOriginalUrlController);
};

export default routes;
