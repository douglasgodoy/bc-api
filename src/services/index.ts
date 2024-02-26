import { DynamoDBSingleton } from 'src/infra/dynamo/DynamoSingleton';
import UrlService from './Url/UrlService';

const dynamoInstance = DynamoDBSingleton.getInstance();
const urlService = new UrlService(dynamoInstance);

export { urlService };
