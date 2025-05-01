import { MongoClient } from "mongodb";

// Replace the following with your Atlas connection string
const url = process.env.MONGODB_URI!;

const client = new MongoClient(url);

export async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");
        return client;  // Returning the client to use it later
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error.stack);
        throw error;  // Rethrow the error to be handled by the caller
    }
}