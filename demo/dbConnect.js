import { MongoClient } from "mongodb";
const url = "mongodb://127.0.0.1:27017";
const client= new MongoClient(url);
const dbName = "e-comm";
const collectName = "products"

export { url, client, dbName, collectName};