import { DynamoDBClient, GetItemCommand}  from "@aws-sdk/client-dynamodb";
import {SSMClient, GetParametersCommand } from "@aws-sdk/client-ssm"
import {DynamoDBDocumentClient, GetCommand} from "@aws-sdk/lib-dynamodb";

export default async function handler () {

    const Sclient = new SSMClient({region: 'us-west-2'});
    const input = {
        Names: ["/amplify/d254nr5j21j7oa/dev/NEXT_PUBLIC_AWS_ACCESS_KEY_ID", "/amplify/d254nr5j21j7oa/dev/NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY"],
        WithDecryption: true,
    };

    const command = new GetParametersCommand(input);
    try {

        const response = await Sclient.send(command);
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
        const queryCommand = new GetCommand({
            TableName:"TaskTracker",
            Key: {
                TaskName: "DSA",
                UserId: 123,
            },
        });
        const item = await docClient.send(queryCommand);
        // Extracting StartTime and EndTime
        const { StartTime, EndTime } = item.Item;
        console.log(item);
        console.log("StartTime:", StartTime);
        console.log("EndTime:", EndTime);

    } catch (err) {
        console.error("DynamoDB fetch Error:", err);
    }
};

handler();