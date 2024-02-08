import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import {SSMClient, GetParametersCommand } from "@aws-sdk/client-ssm"
import * as dotenv from 'dotenv'
dotenv.config();

// import { ddbClient } from "config/dbconfig.js"; // Uncomment if ddbClient is configured in dbconfig.js

// Create service client module using ES6 syntax.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
export const CreateTable = () => {

    const client = new SSMClient({region: 'us-west-2'});
    const input = {
        Names: ["/amplify/d254nr5j21j7oa/dev/NEXT_PUBLIC_AWS_ACCESS_KEY_ID", "/amplify/d254nr5j21j7oa/dev/NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY"],
        WithDecryption: true,
    };

    const command = new GetParametersCommand(input);
    // console.log("Testing");
    const run = async () => {
        try {
            const response = await client.send(command);
            const extractedValues = response.Parameters.map(parameter => parameter.Value);

            const REGION = "us-west-2"; // e.g. "us-east-1"
// Create an Amazon DynamoDB service client object.
            const ddbClient = new DynamoDBClient({
                region: REGION,
                credentials: {
                    // accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
                    accessKeyId: extractedValues[0],
                    // secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
                    secretAccessKey: extractedValues[1],
                },
            });
            const params = {
                AttributeDefinitions: [
                    {
                        AttributeName: "UserId",
                        AttributeType: "N",
                    },
                    {
                        AttributeName: "TaskName",
                        AttributeType: "S",
                    },
                ],
                KeySchema: [
                    {
                        AttributeName: "UserId",
                        KeyType: "HASH",
                    },
                    {
                        AttributeName: "TaskName",
                        KeyType: "RANGE",
                    },
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5,
                },
                TableName: "TaskTracker",
                StreamSpecification: {
                    StreamEnabled: true,
                    StreamViewType: "KEYS_ONLY",
                },
            };
            const data = await ddbClient.send(new CreateTableCommand(params));
            console.log("Table Created", data);
        } catch (err) {
            console.error("Error creating table:", err);
        }
    };

    // run().catch(err => console.error("Error in CreateTable function:", err));
    run();

};

// Call the CreateTable function to execute
CreateTable();

// const REGION = "us-west-2"; // e.g. "us-east-1"
// // Create an Amazon DynamoDB service client object.
// const ddbClient = new DynamoDBClient({
//     region: REGION,
//     credentials: {
//         // accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//         accessKeyId: secret('NEXT_PUBLIC_AWS_ACCESS_KEY_ID'),
//         // secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
//         secretAccessKey: secret('NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY'),
//     },
// });

// Set the parameters
// export const params = {
//     AttributeDefinitions: [
//         {
//             AttributeName: "id",
//             AttributeType: "N",
//         },
//         {
//             AttributeName: "dateAdded",
//             AttributeType: "S",
//         },
//     ],
//     KeySchema: [
//         {
//             AttributeName: "id",
//             KeyType: "HASH",
//         },
//         {
//             AttributeName: "dateAdded",
//             KeyType: "RANGE",
//         },
//     ],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5,
//     },
//     TableName: "Users",
//     StreamSpecification: {
//         StreamEnabled: true,
//         StreamViewType: "KEYS_ONLY",
//     },
// };
//
// export const CreateTable = () => {
//     const run = async () => {
//         try {
//             const data = await ddbClient.send(new CreateTableCommand(params));
//             console.log("Table Created", data);
//         } catch (err) {
//             console.error("Error creating table:", err);
//         }
//     };
//
//     run().catch(err => console.error("Error in CreateTable function:", err));
// };
//
// // Call the CreateTable function to execute
// CreateTable();
