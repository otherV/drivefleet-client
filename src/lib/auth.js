import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("drivefleet");

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 60 * 5, // 5 minutes cache
        },
    },
    plugins: [jwt()],
});