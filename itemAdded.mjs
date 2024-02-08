import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {SSMClient, GetParametersCommand } from "@aws-sdk/client-ssm"
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const itemAdded = () => {

    const client = new SSMClient({region: 'us-west-2'});
    const input = {
        Names: ["/amplify/d254nr5j21j7oa/dev/NEXT_PUBLIC_AWS_ACCESS_KEY_ID", "/amplify/d254nr5j21j7oa/dev/NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY"],
        WithDecryption: true,
    };

    const command = new GetParametersCommand(input);
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
            const docClient = DynamoDBDocumentClient.from(ddbClient);
            let time = new Date();
            let mTime = new Date();
            mTime.setHours(mTime.getHours() + 2);
            const com = new PutCommand({
               TableName: "TaskTracker",
               Item: {
                    TaskName: "DSA",
                    UserId: 123,
                    StartTime: time.toISOString(),
                    EndTime: mTime.toISOString(),
               },
            });
            const res = await docClient.send(com);
            console.log(res);
        } catch (err) {
            console.error("Error Adding item:", err);
        }
    };

    // run().catch(err => console.error("Error in CreateTable function:", err));
    run();

};

// Call the CreateTable function to execute
itemAdded();
