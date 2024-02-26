import { nanoid } from 'nanoid';
import { UrlObjectToDatabase, UrlObjectToParse } from 'src/controllers/types';

export function generateShortId() {
  const shortId = nanoid(7);

  return shortId;
}

export function adapterUrlToDatabase(
  data: UrlObjectToParse,
): UrlObjectToDatabase {
  return {
    Count: data.count,
    OriginalUrl: data.originalUrl,
    PK: data.id,
    SK: data.shortId,
  };
}
