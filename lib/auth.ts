// lib/auth.js
import { LoginPayload, RegisterPayload } from "@/interfaces/interfaces";
import { Account, Client, ID } from "react-native-appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);

export async function register(payload: RegisterPayload) {
  return await account.create({
    userId: ID.unique(),
    email: payload.email,
    password: payload.password,
    name: payload.name,
  });
}


export async function login({ email, password }) {
    return await account.createEmailPasswordSession(email, password);
  }

export async function getUser() {
  return await account.get();
}

export async function logout() {
    return await account.deleteSession('current');
}
