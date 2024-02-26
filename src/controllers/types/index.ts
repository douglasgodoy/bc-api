export type UrlObjectToParse = {
  shortId: string;
  id: string;
  count: number;
  originalUrl: string;
};

export type UrlObjectToDatabase = {
  SK: string;
  PK: string;
  Count: number;
  OriginalUrl: string;
};
