import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({region: 'us-east-2'});
const docClient = DynamoDBDocumentClient.from(client);

export const main = async () => {
    const command = new PutCommand({
        TableName: "HappyAnimals",
        Item: {
            CommonName: "Shiba Inu",
        },
    });

    const response = await docClient.send(command);
    console.log(response);
    return response;
};

