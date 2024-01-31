import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import * as dotenv from 'dotenv'
dotenv.config();
// const aws = require('aws-sdk');

import { secret } from '@aws-amplify/backend';
// import { ddbClient } from "config/dbconfig.js"; // Uncomment if ddbClient is configured in dbconfig.js

// Create service client module using ES6 syntax.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Uncomment the below line if using @aws-amplify/backend for secret management
// import { secret } from '@aws-amplify/backend';

// Set the AWS Region.
const REGION = "us-east-2"; // e.g. "us-east-1"
console.log("Access Key:", secret('NEXT_PUBLIC_AWS_ACCESS_KEY_ID')); // Remove after debugging
console.log("Secret Key:", secret('NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY')); // Remove after debugging

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({
    region: REGION,
    credentials: {
        // accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        accessKeyId: secret('NEXT_PUBLIC_AWS_ACCESS_KEY_ID'),
        // secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        secretAccessKey: secret('NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY'),
    },
});

// Set the parameters
export const params = {
    AttributeDefinitions: [
        {
            AttributeName: "id",
            AttributeType: "N",
        },
        {
            AttributeName: "dateAdded",
            AttributeType: "S",
        },
    ],
    KeySchema: [
        {
            AttributeName: "id",
            KeyType: "HASH",
        },
        {
            AttributeName: "dateAdded",
            KeyType: "RANGE",
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
    TableName: "Users",
    StreamSpecification: {
        StreamEnabled: true,
        StreamViewType: "KEYS_ONLY",
    },
};

export const CreateTable = () => {
    const run = async () => {
        try {
            const data = await ddbClient.send(new CreateTableCommand(params));
            console.log("Table Created", data);
        } catch (err) {
            console.error("Error creating table:", err);
        }
    };

    run().catch(err => console.error("Error in CreateTable function:", err));
};

// Call the CreateTable function to execute
CreateTable();
