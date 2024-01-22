// Import required AWS SDK clients and commands for Node.js
import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../config/dbconfig";

// Set the parameters
export const params = {
    // Add the partionkey and sort key(if needed) together with their types
    AttributeDefinitions: [
        {
            AttributeName: "id", //Primary Key name
            AttributeType: "N", //Type of the primary key
        },
        {
            AttributeName: "dateAdded", //Sort key name
            AttributeType: "S", //Type of the sort key
        },
    ],
    // Declaring which one is primary key and which one is sort key out of above defined attributes.
    // For Primary key -> KeyType = HASH
    // For Sort key -> KeyType = RANGE
    KeySchema: [
        {
            AttributeName: "id", //Primary key name
            KeyType: "HASH",
        },
        {
            AttributeName: "dateAdded", //Sort key name
            KeyType: "RANGE",
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
    TableName: "Users", //TABLE_NAME
    StreamSpecification: {
        StreamEnabled: true,
        StreamViewType: "KEYS_ONLY",
    },
};

const CreateTable = () => {
    const run = async () => {
        try {
            const data = await ddbClient.send(new CreateTableCommand(params));
            console.log("Table Created", data);
            alert("Table Created!")
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <button
                className="px-6
    py-2.5
    bg-blue-600
    text-white
    font-medium
    text-xs
    leading-tight
    uppercase
    rounded
    shadow-md
    hover:bg-blue-700 hover:shadow-lg
    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
    active:bg-blue-800 active:shadow-lg
    transition
    duration-150
    ease-in-out"
                onClick={() => run()}
            >
                Create Table
            </button>
        </div>
    );
};

export default CreateTable;