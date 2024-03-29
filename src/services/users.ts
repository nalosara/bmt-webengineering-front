import appAxios from "./appAxios";
import { User } from "../utils/types";

const getUsers = async (): Promise<User[]> => {
  return appAxios.get(`/users/`).then((response) => {
    const data = response.data;
    console.log(data);
    return data;
  });
};

const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const response = await appAxios.get(`/users/user-by-username/${username}`);
    const data: User = response.data;
    return data;
  } catch (error) {
    if (error) {
      console.log('User not found for username:', username);
      return null;
    }

    console.error('Error fetching user by username:', error);
    throw error;
  }
};

const updateUser = async (data: User) => {
  try {
    if (!data.id) {
      console.error('User ID is missing.');
      return { error: 'User ID is missing.' };
    }

    const response = await appAxios.put(`/users/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    return { error: 'Failed to update user.' };
  }
};

export default {
    getUsers,
    getUserByUsername,
    updateUser
  };
  