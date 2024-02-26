import { Request, Response } from 'express';

import {
  BAD_REQUEST_HTTP_RESPONSE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE,
} from 'src/utils/http';
import { urlService } from 'src/services';

export default async function launchOriginalUrlController(
  req: Request,
  res: Response,
) {
  try {
    const { shortId } = req.params;
    console.log(JSON.stringify(req.params));

    const originalUrl = await urlService.getByShortId(shortId);
    console.log(JSON.stringify(originalUrl));

    if (originalUrl.Count) {
      return res.redirect(originalUrl.Items![0].OriginalUrl);
    }

    return BAD_REQUEST_HTTP_RESPONSE(res, {}, 'The Url does not exists');
  } catch (error) {
    console.error(error);
    return INTERNAL_SERVER_ERROR_HTTP_RESPONSE(res);
  }
}
