import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { UrlObjectToDatabase } from 'src/controllers/types';

class UrlService {
  constructor(private databaseInstance: DocumentClient) {}

  async save(
    data: UrlObjectToDatabase,
  ): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
    const params = {
      TableName: <string>process.env.DYNAMO_TABLE,
      Item: data,
    };

    return await this.databaseInstance.put(params).promise();
  }

  async getByShortId(shortId: string) {
    const params: DocumentClient.QueryInput = {
      TableName: <string>process.env.DYNAMO_TABLE,
      IndexName: 'GSI-SK',
      KeyConditionExpression: 'SK = :SK',
      ExpressionAttributeValues: {
        ':SK': shortId,
      },
    };
    console.log({ params });

    return await this.databaseInstance.query(params).promise();
  }
}

export default UrlService;
