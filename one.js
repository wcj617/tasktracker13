import { SSMClient, GetParametersCommand } from "@aws-sdk/client-ssm";

async function main() {
    const client = new SSMClient({ region: "us-east-2" });

    const input = {
        Names: ["/amplify/d3o1u668gew0s4/staging/AMPLIFY_tasktracker13f9ea9c07_NEXT_PUBLIC_AWS_ACCESS_KEY_ID", "/amplify/d3o1u668gew0s4/staging/AMPLIFY_tasktracker13f9ea9c07_NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY"],
        WithDecryption: true,
    };

    const command = new GetParametersCommand(input);
    try {
        const response = await client.send(command);
        console.log(response);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
// export const handler = async () => {
//     const { Parameters } = await new aws.SSM()
//         .getParameters({
//             Names: ["NEXT_PUBLIC_AWS_ACCESS_KEY_ID", "NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY"].map(secretName => process.env[secretName]),
//             WithDecryption: true,
//         })
//         .promise();
//     const NEXT_PUBLIC_AWS_ACCESS_KEY_ID = Parameters.pop().Value;
//     const NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY = Parameters.pop().Value;
//
//     console.log("Access Key:", NEXT_PUBLIC_AWS_ACCESS_KEY_ID);
//     console.log("Secret:", NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY);
//
// };
