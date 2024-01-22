import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../config/ddbDocClient";
import { useRouter } from "next/router";

const styles = {
    inputField:
        "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none",
};

const AddData = () => {
    const router = useRouter();

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        // Get data from the form.
        const params = {
            TableName: "Users",
            Item: {
                id: Math.floor(Math.random() * 10000),
                dateAdded: new Date().toLocaleString(),
                dateModified: "",
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
                city: event.target.city.value,
                phoneNumber: event.target.phoneNumber.value,
            },
        };

        try {
            const data = await ddbDocClient.send(new PutCommand(params));
            console.log("Success - item added", data);
            alert("Data Added Successfully");
            router.push("/viewdata");
            document.getElementById("addData-form").reset();
        } catch (err) {
            console.log("Error", err.stack);
        }
    };
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <p className="text-3xl mb-20">Add Data</p>
                <div className="block p-6 rounded-lg shadow-lg bg-white w-1/3 justify-self-center">
                    <form onSubmit={handleSubmit} id="addData-form">
                        <div className="form-group mb-6">
                            <label
                                htmlFor="firstName"
                                className="form-label inline-block mb-2 text-gray-700"
                            >
                                First Name
                            </label>
                            <input type="text" className={styles.inputField} id="firstName" />
                        </div>
                        <div className="form-group mb-6">
                            <label
                                htmlFor="lastName"
                                className="form-label inline-block mb-2 text-gray-700"
                            >
                                Last Name
                            </label>
                            <input type="text" className={styles.inputField} id="lastName" />
                        </div>
                        <div className="form-group mb-6">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label inline-block mb-2 text-gray-700"
                            >
                                City
                            </label>
                            <input type="text" className={styles.inputField} id="city" />
                        </div>
                        <div className="form-group mb-6">
                            <label
                                htmlFor="phoneNumber"
                                className="form-label inline-block mb-2 text-gray-700"
                            >
                                Phone Number
                            </label>
                            <input
                                type="number"
                                className={styles.inputField}
                                id="phoneNumber"
                            />
                        </div>

                        <button
                            type="submit"
                            className="
    px-6
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
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddData;