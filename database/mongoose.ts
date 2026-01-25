import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    var mongooseCached: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
}

let cached = global.mongooseCached;

if (!cached) {
    cached = global.mongooseCached = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGODB_URI, {bufferCommands: false}).then((mongoose) => {
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch(err) {
        cached.promise = null;
        throw err;
    }
    console.log(`Connected to MongoDB ${process.env.NODE_ENV} - ${MONGODB_URI}`);
}