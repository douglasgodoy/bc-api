import dotenv from 'dotenv';
import { startApp } from 'src/server';
import dynamodb from 'src/infra/dynamo/dynamodb';

dotenv.config();

dynamodb.startDatabase().then(() => {
  startApp();
});
