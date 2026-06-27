import 'dotenv/config'
import { MongoClient } from "mongodb";
declare global {
  var mongoClient: MongoClient | undefined
}

export const mongo = globalThis.mongoClient || new MongoClient(process.env.MONGODB_URI!)


if (process.env.NODE_ENV !== 'production') {
  globalThis.mongoClient = mongo
}

