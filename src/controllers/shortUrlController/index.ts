import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import {
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE,
  SUCCESS_HTTP_RESPONSE,
} from 'src/utils/http';
import { adapterUrlToDatabase, generateShortId } from './utils';
import { urlService } from 'src/services';

export default async function shortUrlController(req: Request, res: Response) {
  try {
    const body = req.body;
    if (!body.url) {
      return res.status(400).json({ error: 'Missing url in request body' });
    }

    const shortId = generateShortId();
    const id = uuid();

    const adaptedUrl = adapterUrlToDatabase({
      count: 1,
      id,
      originalUrl: body.url,
      shortId,
    });

    await urlService.save(adaptedUrl);

    return SUCCESS_HTTP_RESPONSE(res, {
      shortUrl: `${process.env.BASE_URL}/${shortId}`,
    });
  } catch (error) {
    console.error(error);
    return INTERNAL_SERVER_ERROR_HTTP_RESPONSE(res);
  }
}
