// Create service client module using ES6 syntax.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { secret } from '@aws-amplify/backend';

// Set the AWS Region.
const REGION = "us-west-2"; //e.g. "us-east-1"
// Create an Amazon DynamoDB service client object.

const ddbClient = new DynamoDBClient({
    region: REGION,
    credentials: {
        // accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        accessKeyId: secret('NEXT_PUBLIC_AWS_ACCESS_KEY_ID'),
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
});

export { ddbClient };