import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

export async function connectDB(): Promise<Db> {
  if (db) return db;

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.warn('⚠️  MONGODB_URI is not defined - running without database');
      return null as any;
    }

    client = new MongoClient(uri);
    await client.connect();
    db = client.db('christian-platform');

    console.log('✓ Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('⚠️  MongoDB connection error:', error.message);
    console.warn('⚠️  Running without database - some features will be unavailable');
    return null as any;
  }
}

export function getDB(): Db {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
}

export async function closeDB(): Promise<void> {
  if (client) {
    await client.close();
    console.log('✓ MongoDB connection closed');
  }
}
