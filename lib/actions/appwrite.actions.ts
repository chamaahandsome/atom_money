

import { createSessionClient } from "../appwrite";


export const getUserData = async () => {
  const { account } = await createSessionClient();
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};