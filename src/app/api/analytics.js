import { DynamoDBClient, GetItemCommand}  from "@aws-sdk/client-dynamodb";

export default async function handler (req, res) {
    const client = new DynamoDBClient({region: "us-west-2"});

    try {
        res.status(200).json({data: "Your fetched data"});
    } catch (err) {
        console.error("DynamoDB fetch Error:", err);
        res.status(500).json({ error: "Failed to fetch data"});
    }
}