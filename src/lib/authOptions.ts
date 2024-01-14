import clientPromise from "@/lib/mongoClient";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import {AuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions:AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
    // @ts-ignore
    adapter: MongoDBAdapter(clientPromise),
};