import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({region: 'us-east-2'});
const docClient = DynamoDBDocumentClient.from(client);

export const main = async () => {
    const command = new UpdateCommand({
        TableName: "Dogs",
        Key: {
            Breed: "Labrador",
        },
        UpdateExpression: "set Color = :color",
        ExpressionAttributeValues: {
            ":color": "black",
        },
        ReturnValues: "ALL_NEW",
    });

    const response = await docClient.send(command);
    console.log(response);
    return response;
};

